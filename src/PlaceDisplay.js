import React, {useState} from 'react';
import './PlaceDisplay.css';

function PlaceDisplay({name, rating, id, lat, lng, panToPlace, handleFavorite, distance, getPlaceData, favoriteStatus}) {
  const [favorite, setFavorite] = useState(favoriteStatus)
  const handleClick = (e) => {
    let target = e.currentTarget;
    let lat = parseFloat(target.getAttribute("data-lat"));
    let lng = parseFloat(target.getAttribute("data-lng"));
    getPlaceData(target.id)
    panToPlace({lat, lng}, target.id)
  }
  
  const handleFavoriteChange = e => {
    let id = e.currentTarget.dataset.placeid
    e.stopPropagation();
	  if(favorite === "far") {
      setFavorite("fas");
      handleFavorite(id)
	  } else {
		  setFavorite("far")
	  }
  }
  
  return (
    <div className="PlaceDisplay" data-lat={lat} data-lng={lng} id={id} onClick={handleClick}>
      <div className="PlaceDisplay__Header">
        <h2 className="PlaceDisplay__Title">{name}</h2>
        <i onClick={handleFavoriteChange} className={`${favorite} fa-heart`}></i>
      </div> 
      <div className="PlaceDisplay__Text">
        <p className="PlaceDisplay__Rating">Rating: {rating}</p>
        <p className="PlaceDisplay__Distance">{distance.toFixed(2)} mi.</p>
      </div>
    </div>
  )
}

export default PlaceDisplay

