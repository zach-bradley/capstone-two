import React from 'react';
import './FavoriteItem.css'

function FavoriteItem({name, databaseId, rating, address, handleRemoveFavorite}) {
	let link = `https://www.google.com/maps/dir/?api=1&destination=${address}`
	return (
		<div className="FavoriteItem" >
			<div className="FavoriteItem__Header">
				<h3 className="FavoriteItem__Title">{name}</h3>
				<p onClick={handleRemoveFavorite}id={databaseId} className="FavoriteItem__Close">X</p>
			</div>

			<h5 className="FavoriteItem__Rating">Rating: {rating}</h5>
			<a className="FavoriteItem__Link" href={link}>Directions</a>
		</div>
	)
}

export default FavoriteItem