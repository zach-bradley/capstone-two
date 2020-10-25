import React, {useRef, useCallback, useState, useEffect} from 'react';
import Places from 'google-places-web';
import './App.css';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import mapStyles from './mapStyles';
import Search from './Search';
import Locate from "./Locate";
import Panel from './Panel';

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

function timeout(delay: number) {
	return new Promise( res => setTimeout(res, delay) );}

function App() {
  const [marker, setMarker] = useState(center);
  const [places, setPlaces] = useState([]);
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
		if(e.target.checked) {
			setTerm(e.target.value);
		} else {
			setTerm("")
			setPlaces([])
		}
    
	}
	useEffect(() => {
		async function fetchData() {
			try{
				const response = await Places.textsearch({
				  query: term,
				  location: marker,
				  radius: 5000
				});
				await timeout(2000);
				const next = await Places.textsearch({
					query: term,
					radius: 5000,
					location: marker,
					pagetoken: response.next_page_token
				});
				const data = response.results.concat(next.results)
				const formattedData = data.map(place => (
				  {address: place.formatted_address,
				  latlng: place.geometry.location,
				  name: place.name,
				  photos: place.photos,
				  key: place.place_id
				  }
				));
        		setPlaces(formattedData)
			} catch(error) {
				console.log(error)
			}			
		}
		fetchData()
	}, [term, marker])

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, [])

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

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
        { places.map(place => ( <Marker className="PlaceMarker" key={place.key} position={{lat: place.latlng.lat, lng: place.latlng.lng}} /> ))}
      </GoogleMap>
    </div>
  );
}

export default App;
