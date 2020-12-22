import React, {useState} from 'react';
import './FriendSearch.css'

function FriendSearch({handleGetUsers}) {
	const[inputData, setInputData] = useState("")
	const handleChange = e => {
    	setInputData(e.target.value)
	}
	const handleSubmit = e => {
		e.preventDefault();
		handleGetUsers(inputData)
	}
	return (
		<div className="FriendSearch">
			<form onSubmit={handleSubmit}>
				<label htmlFor="searchTerm">Enter a username:</label>
				<input onChange={handleChange} name="searchTerm" value={inputData}/>
				<button>Add</button>		
			</form>

		</div>
	)
}

export default FriendSearch;