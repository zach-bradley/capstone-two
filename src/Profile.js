import React from 'react';
import {Link} from 'react-router-dom';
import "./Profile.css"

function Profile() {
  return (
    <div className="Profile">
      <div className="Profile__MapLink">
      <Link to="/map">
        <i class="fas fa-arrow-left"></i><span>Back To Map</span>
      </Link>
      </div>
      <div className="Profile__Container">
        <div className="Profile__ContainerInfo">
          <h1>Info</h1>
        </div>
        <div className="Profile__ContainerFavorites">
          <h1>Favorites</h1>
          <ul>
            <li>BAR NAME</li>
            <li>BAR NAME</li>
            <li>BAR NAME</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile
