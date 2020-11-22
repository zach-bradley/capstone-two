import React, {useState} from 'react';
import './FriendSearch.css'

function FriendSearch() {
	const[inputData, setInputData] = useState("")
	const handleChange = e => {
    	setInputData(e.target.value)
	}
	return (
		<div className="FriendSearch">
			<label htmlFor="searchTerm">Enter a username:</label>
			<input onChange={handleChange} name="searchTerm" value={inputData}/>		
		</div>
	)
}

export default FriendSearch;