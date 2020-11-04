import React from 'react';
import "./Locate.css"

function Locate({panTo}) {
  const handleClick = () => {
        navigator.geolocation.getCurrentPosition((position) => {  
          panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        }, () => null,
        );
      }
  return (
    <button className="Locate" >
      <img src="pin.svg" alt="pin - locate me" title="Made by Vitaly Gorbachev" onClick={handleClick}
  />
    </button>
  )
}

export default Locate;
