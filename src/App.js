import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Map from './Map';
import Profile from './Profile';
import Login from './Login';
import Register from './Register';
import {auth} from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    });
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Route path='/map'>
          <Map />
        </Route>
        <Route exact path='/profile'>
          <Profile user={user} />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Redirect to="/register" />
      </BrowserRouter>
    </div>
  );
}

export default App;
