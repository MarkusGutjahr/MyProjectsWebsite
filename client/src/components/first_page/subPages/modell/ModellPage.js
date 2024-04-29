import React from 'react';
import BoxContainer from "../../general_structure/BoxContainer";

const ModellPage = () => {
    const items = [
        {to: "/modelling", id:"modellingprev", text:"Modelling"},
        {to: "/shading", id:"shadingprev", text:"Shading"},
    ];


    return (
        <div className="modell-page multiboxes">
            <BoxContainer items={items}/>
        </div>
    );
};

export default ModellPage;