import React, {useRef, useCallback, useState, useEffect} from 'react';
import Places from 'google-places-web';
import './App.css';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import mapStyles from './mapStyles';
import Search from './Search';
import Locate from "./Locate";

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

function App() {
  const [marker, setMarker] = useState(center);
  const [places, setPlaces] = useState(null);
  const [term, setTerm] = useState();
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey:"AIzaSyBWMoZX5xY3yW07JpwybHdhogQn9R1XG4c",
    libraries
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMarker({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      })    
    }
  });

  const panTo = useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng});
    mapRef.current.setZoom(15);
    setMarker({lat,lng});
  }, []);
	
	const onCheck = (e) => {
    setTerm(e.target.value);
	}
	useEffect(() => {
		async function fetchData() {
			try{
        console.log(Places.textsearch())
				const response = await Places.textsearch({
          query: term,
          radius: 2000
				});
        const data = response.results.map(place => (
          {address: place.formatted_address,
          latlng: place.geometry.location,
          name: place.name,
          photos: place.photos,
          key: place.place_id
          }
        ));
        setPlaces(data)
			} catch(error) {
				console.log(error)
			}			
		}
		fetchData()
	}, [term])

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, [])

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  const placeMarkers = places !== null ? places.map(place => ( <Marker className="PlaceMarker" key={place.key} position={{lat: place.latlng.lat, lng: place.latlng.lng}} /> )) : null;

  return (
    <div className="App">
      <Search center={center} panTo={panTo} />
	  <div className="checkbox">
		  <label htmlFor="bar">All Bars</label>
		  <input onChange={onCheck} name="all" type="checkbox" value="bar"/>		  
	  </div>
      <Locate panTo={panTo} />
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={marker} options={options} onLoad={onMapLoad}>
        <Marker key={`${marker.lat}-${marker.lng}`} position={{lat: marker.lat, lng:marker.lng}} />
        {places !== null && placeMarkers}
      </GoogleMap>
    </div>
  );
}

export default App;
