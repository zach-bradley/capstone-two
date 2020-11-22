import React from 'react';
import './Backdrop.css'

function Backdrop({show, clicked}){
	return (
		<>
		{show ? <div className="Backdrop" onClick={clicked}></div> : null	}
		</>
	)
}

export default Backdrop;