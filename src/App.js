import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Map from './Map';
import Profile from './Profile';
import Login from './Login';
import Register from './Register';
import {auth, db} from "./firebase";
import {updateFavorites, updateFriends, removeFriend} from './helpers';

function App() {
  const [user, setUser] = useState(null);
  const [update, setUpdate] = useState(false);
  const [favorites, setFavorites] = useState(null);
  const [friends, setFriends] = useState(null);
	
  const handleUpdater = () => {
	  setUpdate(!update)
  }

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser) {
		  db.collection("users").doc(authUser.uid).get().then(doc => {
        setUser(doc.data())})
      } else {
        setUser(null);
      }
    });
  }, []) 
  	
	useEffect(() => {
    if(user) {
      async function getData(){
        let favorites = await updateFavorites(user);
        let friends = await updateFriends(user);
        setFavorites(favorites);
        setFriends(friends)
        setUpdate(false);
      }
      getData()      
    }
	},[user, update])
	
  const handleRemoveFavorite = e => {
		let target = e.target.id;
		db.collection("users").doc(user?.uid).collection("favorites").doc(target).delete()
		.then(() => handleUpdater())
		.catch(error => console.log(error))									   
  }

  const handleRemoveFriend = friendId => {
    removeFriend(user, friendId)
    handleUpdater();		
  }
	
  const handleAuthentication = () => {
    if (user) {
	  setUser(null)
      auth.signOut()
    }
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        <Route path='/map'>
          <Map user={user} handleUpdater={handleUpdater} favorites={favorites}/> 
        </Route>
        <Route exact path='/profile'>
			{user ? <Profile user={user} handleRemoveFriend={handleRemoveFriend} handleAuthentication={handleAuthentication} favorites={favorites} friends={friends} handleRemoveFavorite={handleRemoveFavorite} handleUpdater={handleUpdater} /> : <Redirect to="/map" />}
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register user={user}/>
        </Route>
        <Redirect to={user ? "/map" : "/login"} />
      </BrowserRouter>
    </div>
  );
}

export default App;
