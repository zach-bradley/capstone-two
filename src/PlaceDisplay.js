import React, {useState} from 'react';
import './PlaceDisplay.css';

const formatAddress = (address) => {
  let arr = address.split(",");
  return arr[0];
}

function PlaceDisplay({address, name, rating, id, lat, lng, coords, panToPlace, handleFavorite}) {
  const [favorite, setFavorite] = useState("far")
  let linkformat = formatAddress(address)
  const linkAddress = `https://www.google.com/maps/dir/?api=1&origin=${coords}&destination=${linkformat}`;
  const handleClick = (e) => {
    let target = e.currentTarget;
    let lat = parseFloat(target.getAttribute("data-lat"));
    let lng = parseFloat(target.getAttribute("data-lng"));
    panToPlace({lat, lng})
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
        <p className="PlaceDisplay__Address">{address}</p>
        <p className="PlaceDisplay__Rating">Rating: {rating}</p>
      </div>
	  <div className="PlaceDisplay__Footer">
		 <a className="PlaceDisplay__Button" href={linkAddress}>Directions</a>
		 <i onClick={handleFavoriteChange} data-placeid={id} className={favorite + " fa-heart"}></i>	 		  
	  </div>

    </div>
  )
}

export default PlaceDisplay

