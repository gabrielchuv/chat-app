import React from 'react';
import './InfoBar.css';

import closeIcon from '../../icons/closeIcon';
import onlineIcon from '../../icons/onlineIcon';

function Infobar() {
    <div className="infoBar"> 
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online icon" />
            <h3>roomName</h3>
        </div>
        <div className="rightInnerContainer">
            { /* Refreshing in order to get rid of queried strings and to clean up socket */ }
            <a href="/"><img src={closeIcon} alt="close icon" /></a>
        </div>
    </div>
}

export default Infobar;
