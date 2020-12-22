import Places from 'google-places-web';	
import axios from "axios";
import {db} from './firebase';
Places.apiKey = "AIzaSyBWMoZX5xY3yW07JpwybHdhogQn9R1XG4c";

function getDistanceFromLatLon(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
	let conversion =  d / 1.609344;
	return conversion
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function formatData(data, marker) {
  return data.map(place => (
    {address: place.formatted_address ? place.formatted_address : null,
    latlng: place.geometry.location,
    name: place.name,
    photos: null,
    rating: place.rating,
		key: place.place_id,
		distance: getDistanceFromLatLon(place.geometry.location.lat, place.geometry.location.lng, marker.lat,marker.lng)
    }
  )); 
}

export async function postToServer(term, marker, pageToken) {
	let search = pageToken ? {
		query: term,
		location: `${marker.lat}, ${marker.lng}`,
		pagetoken: pageToken
		} : {
		query: term,
		location: `${marker.lat}, ${marker.lng}`
		};
	let request = await axios.post(
	"http://localhost:5001/happy-hour-79e9b/us-central1/api/search"
	// "https://us-central1-happy-hour-79e9b.cloudfunctions.net/api/search"
	, search)
	let results = formatData(request.data.results, marker);
	let token = request.data.next_page_token ? request.data.next_page_token: null;
	return {results: results, pageToken: token}
}

export function findIfIncluded(arr, term) {
	arr.forEach(function(idx){
		if(idx.key === term){
			return true;
		} 
	});
	return false;
}

export function comparer(otherArray){
  return function(current){
    return otherArray.filter(function(other){
      return other.value === current.value && other.display === current.display
    }).length === 0;
  }
}

export async function delay(ms){
 return new Promise(resolve => setTimeout(resolve, ms))
}

export async function retry(fn, n){
	let timer = 1000;
	let counter = 0;
	let results;
	while(counter < n){
		if(results && results.results){
			return results;
		}
		timer += 500;
	    counter += 1
		await delay(timer);
		try{
			results = await fn();
		} catch{}
	}
	return {error: "Can't load any more data"}
}
			
export function formatAddress(address) {
  let arr = address.split(",");
  return arr[0];
}

export async function addFriend(userUid, friendData) {
	await db
		.collection("users")
		.doc(userUid)
		.collection("friends").doc(friendData.uid)
	.set({id: friendData.uid, username: friendData.username})
	.catch(error => console.log(error))
}

export async function getUser(userUid, name){
	let trimName = name.trim();
	await db.collection("users").get()
	.then(querySnapshot => {
		querySnapshot.forEach(async(doc) => {if(doc.data().username === trimName) addFriend(userUid, doc.data())})
	});
}

export async function removeFriend(user, friendId) {
	await db.collection("users").doc(user.uid).collection("friends").doc(friendId).delete()				   
}


export async function updateFavorites(user) {
	let favList = [];
	await db.collection("users").doc(user?.uid).collection("favorites").get()
	.then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
			favList.push({...doc.data(), id: doc.id})
		});
	})
	return favList;
}

export async function updateFriends(user) {
	let friendList = [];
	await db.collection("users").doc(user?.uid).collection("friends").get()
	.then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
			friendList.push(doc.data())
		});
	})
	return friendList;
}

export function inObject(data, placeId) {
	let found = false;
	for (let i = 0; i < data.length; i++) {
		if (data[i].key === placeId) {
			found = true;
			break;
		}
	}
	return found;
}