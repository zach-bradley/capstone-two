import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Map from './Map';
import Profile from './Profile';
import Login from './Login';
import Register from './Register';
import {auth, db} from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [update, setUpdate] = useState(false);
  const [favorites, setFavorites] = useState(null);
	
  const handleUpdater = () => {
	  setUpdate(!update)
  }
		
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
		console.log(authUser)
      if(authUser) {
		db.collection("users").doc(authUser.uid).get().then(doc => setUser(doc.data()))  
		// setUser({
		// 	name: authUser.displayName,
		// 	email: authUser.email,
		// 	uid: authUser.uid
		// })
      } else {
        setUser(null);
      }
    });
  }, []) 
  	
	useEffect(() => {
		let list = [];
		async function getData(){
			await db.collection("users").doc(user?.uid).collection("favorites").get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					list.push({...doc.data(), id: doc.id})
				});
			}).then(() => {
				setFavorites(list);
				setUpdate(false);
			})
		}
		getData()
	},[user, update])
	
  const handleRemoveFavorite = e => {
		let target = e.target.id;
		db.collection("users").doc(user?.uid).collection("favorites").doc(target).delete()
		.then(() => handleUpdater())
		.catch(error => console.log(error))									   
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
          <Map user={user} handleUpdater={handleUpdater} />
        </Route>
        <Route exact path='/profile'>
			{user ? <Profile user={user} handleAuthentication={handleAuthentication} favorites={favorites} handleRemoveFavorite={handleRemoveFavorite} /> : <Redirect to="/map" />}
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register user={user}/>
        </Route>
        <Redirect to={user ? "/profile" : "/login"} />
      </BrowserRouter>
    </div>
  );
}

// let data =  db.collection("users").doc(user?.uid).get().then(doc => console.log(doc.data().username))

export default App;
