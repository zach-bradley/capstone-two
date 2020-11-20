import React from 'react';
import './Panel.css';
import PlaceDisplay from './PlaceDisplay';


function Panel({visibility, onClick, data, coords, panToPlace, user, handleFavorite}) {

	return (
    <div className="wrapper">
      <div id="Panel__Tab" className={visibility} onClick={onClick}>
        <p className="Panel__TabText">Bars</p>
      </div>    
      <div id="Panel" className={visibility}>
        <div className="Panel__PlaceList">
          {data.length > 0 ? data.map(place => (
            <PlaceDisplay handleFavorite={handleFavorite} key={place.key} id={place.key} address={place.address} name={place.name} rating={place.rating} lat={place.latlng.lat} lng={place.latlng.lng} coords={coords} panToPlace={panToPlace}/>
          )) : <h1>Add filters to see nearby bars!</h1>}
        </div>
      </div>    
    </div>

	)
}

export default Panel;