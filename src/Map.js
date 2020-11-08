import React, {useRef, useCallback, useState, useEffect} from 'react';
import Places from 'google-places-web';
import './Map.css';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import mapStyles from './mapStyles';
import Search from './Search';
import Locate from "./Locate";
import Panel from './Panel';
import { Link } from 'react-router-dom';

Places.apiKey = "AIzaSyBWMoZX5xY3yW07JpwybHdhogQn9R1XG4c";
const libraries = ["places"];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
}

let center= {
  lat: 40.9584, 
  lng: -75.9746  
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function formatData(data) {
  return data.map(place => (
    {address: place.formatted_address,
    latlng: place.geometry.location,
    name: place.name,
    photos: place.photos,
    rating: place.rating,
    key: place.place_id
    }
  )); 
}

function Map() {
  const [marker, setMarker] = useState(center);
  const [places, setPlaces] = useState([]);
  const [term, setTerm] = useState();
  const [panel, setPanel] = useState("hide");
  const [selected, setSelected] = useState(null);
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey:"AIzaSyBWMoZX5xY3yW07JpwybHdhogQn9R1XG4c",
    libraries
  });

  const panTo = useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng});
    mapRef.current.setZoom(15);
    setMarker({lat,lng});
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
  
  const handleClick = () => {
    setPanel(panel === "hide" ? "show" : "hide")
  }

	useEffect(() => {
		async function fetchData() {
			try{
				const response = await Places.textsearch({
				  query: term,
				  location: `${marker.lat}, ${marker.lng}`,
				  radius: 1000
        });
        setPlaces(formatData(response.results))
        await timeout(2000);
				const next = await Places.textsearch({
					query: term,
					radius: 1000,
					location: `${marker.lat}, ${marker.lng}`,
					pagetoken: response.next_page_token
        });
				setPlaces(p => p.concat(formatData(next.results)))

			} catch(error) {
				console.log(error)
			}			
		}
		fetchData()
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
        <Link to="/profile"><img src="https://www.pinclipart.com/picdir/big/181-1814767_person-svg-png-icon-free-download-profile-icon.png" alt="profile"/></Link>
      </div>
      <Panel visibility={panel} onClick={handleClick} data={places} coords={`${marker.lat},${marker.lng}`} panToPlace={panToPlace}/>
      <Search center={center} panTo={panTo} />
      <div className="Checkbox">
        <h5>Filters</h5>
        <form onChange={onCheck}>
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
        </form>    
      </div>
      <Locate panTo={panTo} />
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={marker} options={options} onLoad={onMapLoad}>
        <Marker className="barMarker" key={`${marker.lat}-${marker.lng}`} position={{lat: marker.lat, lng:marker.lng}} />

        {places.length > 0 && places.map(place => ( <Marker key={place.key} position={{lat: place.latlng.lat, lng: place.latlng.lng}} onClick={() => {setSelected(place)}}/> ))}
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
