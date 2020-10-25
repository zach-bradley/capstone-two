import React from 'react';
import "./Locate.css"

function Locate({panTo}) {
  return (
    <button className="Locate" onClick={() => {
      navigator.geolocation.getCurrentPosition((position) => {
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, () => null,
      );
    }}>
      <img src="pin.svg" alt="pin - locate me" title="Made by Vitaly Gorbachev"/>
    </button>
  )
}

export default Locate
