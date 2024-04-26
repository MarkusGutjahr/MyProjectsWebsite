import React from 'react';
import {Link} from "react-router-dom";
import BoxContainer from "../../general_structure/BoxContainer";
import '../../general_structure/MultiBoxes.css';

const MediengestaltungPage = () => {
    const items = [
        {to: "/logo", id:"logoprev", text:"Logo"},
        {to: "/webdesign", id:"designprev", text:"Web Design"},
    ]


    return (
        <div className="mediengestaltung-page multiboxes">
            <BoxContainer items={items}/>
        </div>
    );
};

export default MediengestaltungPage;
