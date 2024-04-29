import React from 'react';
import BoxContainer from "../../general_structure/BoxContainer";
import '../../general_structure/BoxesStyles.css';

const WebPage = () => {
    const items = [
        {to:"/medienprojekt", id:"medienprojektprev", text:"Medienprojekt"},
        {to: "/frontenddevelopment", id:"frontenddevelopmentprev", text:"Frontend Development"},
    ]

    return (
        <div className="web-page multiboxes">
            <BoxContainer items={items}/>
        </div>
    );
};

export default WebPage;
