import React from 'react';
import './Panel.css';

function Panel({visibility}) {
	return (
		<div id="Panel" className={visibility}>
			<div className="PanelTab">Open</div>
		</div>
	)
}

export default Panel;