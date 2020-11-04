import React from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Map from './Map';
import Profile from './Profile'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Route path='/map'>
          <Map />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Redirect to="/map" />
      </BrowserRouter>
    </div>
  );
}

export default App;
