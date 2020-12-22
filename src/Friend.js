import React from 'react';
import './Friend.css'

function Friend({id,username, handleRemoveFriend}) {
  const handleClick = e => {
    let friendId = e.target.id;
    handleRemoveFriend(friendId)
  }
  return (
    <div className="Friend" >
      <h3>{username}</h3>
      <p id={id} className="Friend__Close" onClick={handleClick}>X</p>
    </div>
  )
}

export default Friend;
