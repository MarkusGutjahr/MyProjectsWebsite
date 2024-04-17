import React from 'react';
import {Link} from "react-router-dom";

const MediengestaltungPage = () => {
    return (
        <div className="box-container">
            <Link to="/logo" className="box" id="logoprev"></Link>
            <Link to="/webdesign" className="box" id="designprev"></Link>
        </div>
    );
};

export default MediengestaltungPage;
