import React from 'react';
import './Panel.css';
import PlaceDisplay from './PlaceDisplay';
import PlaceShow from './PlaceShow';
import {inObject} from './helpers';


function Panel({visibility, onClick, data, coords, panToPlace, handleFavorite, favorites, placeShowData, placeShowActive, handleBackClick, getPlaceData}) {
  let sortedData = data.length > 0 ? data.sort((a,b) => a.distance - b.distance) : null;
	return (
    <div className="wrapper">
      <div id="Panel__Tab" className={visibility} onClick={onClick}>
        <p className="Panel__TabText">Bars</p>
      </div>    
      <div id="Panel" className={visibility}>
        {placeShowActive ? <PlaceShow data={placeShowData} handleBackClick={handleBackClick}/> : <div className="Panel__PlaceList">
          {data.length > 0 ? sortedData.map(place => {
            let favoriteStatus = inObject(favorites, place.key) ? "fas" : "far"
            return(
            <PlaceDisplay favoriteStatus={favoriteStatus} handleFavorite={handleFavorite} key={place?.key} id={place?.key} address={place?.address ? place?.address : place?.name} name={place?.name} rating={place?.rating} lat={place?.latlng.lat} lng={place?.latlng.lng} coords={coords} getPlaceData={getPlaceData} panToPlace={panToPlace} distance={place.distance}/>
          )}) : <h1>Add filters to see nearby bars!</h1>}
        </div>}
      </div>    
    </div>

	)
}

export default Panel;