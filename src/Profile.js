import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import "./Profile.css";
import FavoriteItem from './FavoriteItem';
import Modal from './Modal';
import FriendSearch from './FriendSearch';
import Friend from './Friend'
import {getUser} from './helpers'

function Profile({user, handleAuthentication, favorites, friends, handleRemoveFavorite, handleRemoveFriend, handleUpdater}) {
	const [modalToggle, setModalToggle] = useState(false);
	const modalHandler = e => {
		e.preventDefault()
		setModalToggle(!modalToggle)
	}
	const handleGetUsers = name => {
		getUser(user.uid,name)
		setModalToggle(false);
		handleUpdater()
	}

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
		<div className="Profile__ContainerInfoFriends">
			<div className="Profile__ContainerInfo">
				<h1>{user.fullname}'s Info</h1>
				<hr/>
				<p><strong><i className="fas fa-user"></i> Username:</strong> {user?.username}</p>
				<p><strong><i className="fas fa-envelope"></i> Email:</strong> {user?.email}</p>
			</div>
			<div className="Profile__ContainerFriends">
			  <h1>Friends</h1>
				<button className="Profile__ContainerFriendsButton" onClick={modalHandler}>Add Friend</button>
				<div className="Profile__ContainerFriendsList">
					{friends.length ? friends.map(friend => <Friend username={friend.username} id={friend.id} key={friend.id} handleRemoveFriend={handleRemoveFriend} />) : null}
				</div>
			</div>	
		</div>

        <div className="Profile__ContainerFavorites">
          <h1>Favorites</h1>
		  <div className="Profile__FavoritesList">
			  {favorites?.map(favorite => (
			  	<FavoriteItem handleRemoveFavorite={handleRemoveFavorite} name={favorite.name} databaseId={favorite.id} rating={favorite.rating} address={favorite.address} key={favorite.key}/>
			  ))}	  
		</div>
        </div>
      </div>
	  	<Modal show={modalToggle} modalClosed={modalHandler}>
		  <FriendSearch handleGetUsers={handleGetUsers} />
		</Modal>
    </div>
  )
}

export default Profile
