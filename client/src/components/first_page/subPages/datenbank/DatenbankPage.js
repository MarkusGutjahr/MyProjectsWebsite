import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import SERMPage from './SERMPage';
import BoxContainer from "../../general_structure/BoxContainer";
import '../../general_structure/BoxesStyles.css';
import '../../general_structure/aspect-ratio-styles.css';

const DatenbankPage = () => {
    const items = [
        {to:"serm", id:"sermprev", text:"SERM-Übung-Powerpoint"}
    ]

    return (
        <div className="datenbank-page multiboxes">
            <BoxContainer items={items}/>
        </div>
    );
};

export default DatenbankPage;
