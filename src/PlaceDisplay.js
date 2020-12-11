import React, {useState} from 'react';
import './PlaceDisplay.css';

function PlaceDisplay({address, name, rating, id, lat, lng, coords, panToPlace, handleFavorite, distance, getPlaceData}) {
  const [favorite, setFavorite] = useState("far")
  const linkAddress = `https://maps.google.com/?saddr=Current%20Location&daddr=${address}`;
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
      <h2 className="PlaceDisplay__Title">{name}</h2>
      <div className="PlaceDisplay__Text">
        <p className="PlaceDisplay__Rating">Rating: {rating}</p>
        <p className="PlaceDisplay__Distance">{distance.toFixed(2)} mi.</p>
      </div>
    </div>
  )
}

export default PlaceDisplay

