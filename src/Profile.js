import React from 'react';
import {Link} from 'react-router-dom';
import "./Profile.css";
import {db} from './firebase';

function Profile({user, handleAuthentication}) {
  let favorites = db.collection("users").doc(user?.uid).collection("favorites").get();

  return (
    <div className="Profile">
	  <div className="Profile__Header">
		  <div className="Profile__MapLink">
		  <Link to="/map">
			<i className="fas fa-arrow-left"></i><span>Back To Map</span>
		  </Link>	  
	  </div>
		<p onClick={() => handleAuthentication()} className="Profile__HeaderLogout">Logout</p>
      </div>
      <div className="Profile__Container">
        <div className="Profile__ContainerInfo">
          <h1>Info</h1>
		  <p><strong>Name:</strong> {user?.name}</p>
		  <p><strong>Email:</strong> {user?.email}</p>
        </div>
        <div className="Profile__ContainerFavorites">
          <h1>Favorites</h1>
          <ul>
            {console.log(favorites)}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile
