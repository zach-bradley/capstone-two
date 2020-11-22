import Places from 'google-places-web';	

Places.apiKey = "AIzaSyBWMoZX5xY3yW07JpwybHdhogQn9R1XG4c";

function formatData(data) {
  return data.map(place => (
    {address: place.formatted_address ? place.formatted_address : null,
    latlng: place.geometry.location,
    name: place.name,
    photos: null,
    rating: place.rating,
    key: place.place_id
    }
  )); 
}

export function findIfIncluded(arr, term) {
	arr.forEach(function(idx){
		if(idx.key === term){
			return true;
		} 
	});
	return false;
}

export function removeDups(origArr, updatingArr) {
	let copyArr = origArr;
	for(var i = 0, l = copyArr.length; i < l; i++) {
    for(var j = 0, ll = updatingArr.length; j < ll; j++) {
        if(copyArr[i].id === updatingArr[j].id) {
            copyArr.splice(i, 1, updatingArr[j]);
            break;
        }
    }
	}
	return copyArr
}


export async function fetchData(marker,term, pageToken) {
	try{
		let search = pageToken ? {
		query: term,
		location: `${marker.lat}, ${marker.lng}`,
		pagetoken: pageToken
		} : {
		query: term,
		location: `${marker.lat}, ${marker.lng}`
		};
		let response = await Places.textsearch(search);
		let results = formatData(response.results);
		let token = response.next_page_token ? response.next_page_token: null;
		return {results: results, pageToken: token}
	} catch(error) {
		return {error: error}
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



