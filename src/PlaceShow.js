import React from 'react';
import "./PlaceShow.css"

function PlaceShow({data, handleBackClick}) {
  let distance = data?.distance.toFixed(2);
  let rating = Array(Math.round(data?.rating)).fill().map((_,i) => (
    <span key={i} role="img" aria-label="rating">⭐</span>
  ))
  let link = `https://www.google.com/maps/dir/?api=1&destination=${data.address}`
  return (
  <div className="PlaceShow">
      <div className="PlaceShow__Back" onClick={handleBackClick}><i className="fas fa-arrow-left"></i></div>
      <div className="PlaceShow__Header">
        <img className="PlaceShow__Header-Image" src="https://images.unsplash.com/photo-1568031813264-d394c5d474b9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=749&q=80" alt="bar"/>
        <h3 className="PlaceShow__Header-Title">{data?.name}</h3>   
        <p className="PlaceShow__Header-Rating">{data?.rating}{rating}</p>
        <p className="PlaceShow__Header-Distance">{distance} mi.</p>
      </div>
      <div className="PlaceShow__Body">
        <p className="PlaceShow__Body-Address"><strong>Address:</strong> {data?.address}</p>
        <a className="PlaceShow__Body-Link" href={link}>Directions</a>
      </div>
    </div>
  )
}

export default PlaceShow
