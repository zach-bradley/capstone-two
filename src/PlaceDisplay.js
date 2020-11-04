import React from 'react';
import './PlaceDisplay.css';

const formatAddress = (address) => {
  let arr = address.split(",");
  return arr[0];
}

function PlaceDisplay({address, name, rating, lat, lng, coords, panToPlace}) {
  let linkformat = formatAddress(address)
  const linkAddress = `https://www.google.com/maps/dir/?api=1&origin=${coords}&destination=${linkformat}`;
  const handleClick = (e) => {
    let target = e.currentTarget;
    let lat = parseFloat(target.getAttribute("data-lat"));
    let lng = parseFloat(target.getAttribute("data-lng"));
    panToPlace({lat, lng})
  }

  return (
    <div className="PlaceDisplay" data-lat={lat} data-lng={lng} onClick={handleClick}>
      <h2 className="PlaceDisplay__Title">{name}</h2>
      <div className="PlaceDisplay__Text">
        <p className="PlaceDisplay__Address">{address}</p>
        <p className="PlaceDisplay__Rating">Rating: {rating}</p>
      </div>
     <a className="PlaceDisplay__Button" href={linkAddress}>Directions</a>
    </div>
  )
}

export default PlaceDisplay



// {
//   "address":"967 N Locust St, Hazleton, PA 18201, United States",
//   "latlng":{"lat":40.971635,"lng":-75.9823373},
//   "name":"The Q Sports Bar & Grill",
//   "photos":[
//     {"height":3024,
//     "html_attributions":["<a href=\"https://maps.google.com/maps/contrib/111287513190562403540\">A Google User</a>"],"photo_reference":"CmRaAAAAil8Fe9VDz-5I1vHVYxCq_0gLedn5AOLobyp4zEoL7Ttx47682ObrRV88bczt942GsSGm088HUr7QEqkIgM90-7Ft3Wy2YJ9BUcI6kx6cZ_C5V33jMou2ckRMbiITR-TSEhBrBvooB12s-6I-06HUs46UGhQkca4OBTUfFMaOFM0kgM5FTiWlhQ",
//     "width":4032}
//   ],
//   "key":"ChIJlVU0AnulxYkRbKsVauQlRiU"
// }

// https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=PHOTO_REF&key=YOUR_API_KEY
