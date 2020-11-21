import React, {useRef, useCallback, useState, useEffect} from 'react';
import './Map.css';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import mapStyles from './mapStyles';
import Search from './Search';
import Locate from "./Locate";
import Panel from './Panel';
import { Link } from 'react-router-dom';
import {fetchData, retry} from './helpers';
import {db} from "./firebase";


const libraries = ["places"];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
}

let center= {
  lat: 40.9584, 
  lng: -75.9746,
  show:true  
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true
}


function Map({user}) {
  const [marker, setMarker] = useState(center);
  const [places, setPlaces] = useState([]);
  const [term, setTerm] = useState();
  const [panel, setPanel] = useState("hide");
  const [filter, setFilter] = useState("show")
  const [selected, setSelected] = useState(null);
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey:"AIzaSyBWMoZX5xY3yW07JpwybHdhogQn9R1XG4c",
    libraries
  });
	
  const panTo = useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng});
    mapRef.current.setZoom(15);
    setMarker({lat,lng,show:true});
  }, []);
  
  const panToPlace = useCallback(({lat, lng}) => {
    setPanel("hide");
    mapRef.current.panTo({lat,lng});
    mapRef.current.setZoom(17);
  }, []);
  
	const onCheck = (e) => {
		if(e.target.checked) {
			setTerm(e.target.value);
		} else {
      setTerm("")
			setPlaces([])
		}
  }
  const handleFavorite = id => {
    let favPlace = places.filter(place => place.key === id)
	  db
	    .collection("users")
	    .doc(user?.uid)
	    .collection("favorites")
		.add(favPlace[0])
		.then(docRef => console.log(docRef))
		.catch(error => console.log(error))
  }

  // const handlePan = () => {
  //   let lat = mapRef.current.getCenter().lat()
  //   let lng = mapRef.current.getCenter().lng()
  //   setMarker({lat: lat, lng: lng, show:false})
  // }
  
  const handleClick = e => {
    if(e.currentTarget.id === "Checkbox__Tab") {
      setFilter(filter === 'filterhide' ? 'filtershow' : 'filterhide')
    } else {
      setPanel(panel === "hide" ? "show" : "hide")      
    }

  }

  const handleMapClick = e => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      show: true
    })
  }
 
	useEffect(() => {
		async function getData() {
			if(term) {
				let placeData = await fetchData(marker, term);
				let token = placeData.pageToken;
        setPlaces(placeData.results);
        let next = await retry(() => fetchData(marker, term, token),8);
        setPlaces(p => p.concat(next.results))
        let nextToken = next.pageToken;
        let final = await retry(() => fetchData(marker, term, nextToken),5);
				setPlaces(p => p.concat(final.results))
			}
		}
		getData()
	}, [marker, term])

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, [])

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div className="Map">
		  
      <div className="Map__ProfileLink">
        <Link to={user ? "/profile" : "/login"}><img src="https://www.pinclipart.com/picdir/big/181-1814767_person-svg-png-icon-free-download-profile-icon.png" alt="profile"/></Link>
      </div>
      <Panel visibility={panel} onClick={handleClick} data={places} coords={`${marker.lat},${marker.lng}`} panToPlace={panToPlace} handleFavorite={handleFavorite}/>
      <Search center={center} panTo={panTo} /> 
	  <div id="Checkbox" className={filter}>
      <div id="Checkbox__Tab" onClick={handleClick}>
        <p className="Checkbox__TabText">Filters</p>
      </div>  		  
          <h5>Filters</h5>
          <form onChange={onCheck} className="Map__Filter">
            <button >Remove Filter</button>
            <div>
              <label htmlFor="bar">All Bars</label>
              <input name="choice" type="radio" value="bar"/>	               
            </div>
            <div>
              <label htmlFor="beer">Beer</label>
              <input name="choice" type="radio" value="beer bar"/>	          
            </div>
            <div>
              <label htmlFor="whiskey">Whiskey</label>
              <input name="choice" type="radio" value="whiskey bar"/>	            
            </div>
            <div>
              <label htmlFor="tequila">Tequila</label>
              <input name="choice" type="radio" value="tequila bar"/>	            
            </div>
            <div>
              <label htmlFor="wine">Wine</label>
              <input name="choice" type="radio" value="wine bar"/>	            
            </div>
            <div>
              <label htmlFor="sports">Sports Bar</label>
              <input name="choice" type="radio" value="sports bar"/>	            
            </div>
          </form>    
      </div>
      <Locate panTo={panTo} />
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={marker} options={options} onLoad={onMapLoad} onClick={handleMapClick}>
        <Marker className="barMarker" key={`${marker.lat}-${marker.lng}`} position={{lat: marker.lat, lng:marker.lng}} />
        
        {places?.length > 0 && places.map(place => ( <Marker key={place?.key} position={{lat: place?.latlng.lat, lng: place?.latlng.lng}} onClick={() => {setSelected(place)}}/> ))}
        {selected ? (
          <InfoWindow 
            position={{lat:selected.latlng.lat,lng:selected.latlng.lng}} 
            onCloseClick={()=> {setSelected(null)}}>
              <div className="InfoWindow">
                <p>{selected.name}</p>
                <p><a href={`https://www.google.com/maps/dir/?api=1&origin=${marker.lat},${marker.lng}&destination=${selected.address}`}>Directions</a></p>
              </div>   
          </InfoWindow>
          ) : null
        }
      </GoogleMap>
    </div>
  );
}

export default Map;
