import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import SERMPage from './SERMPage';

const DatenbankPage = () => {
    return (
        <div>
            <Routes>
                <Route path="/serm" element={<SERMPage />} />
            </Routes>
            <div className="box-container">
                <Link to="/serm" className="bigbox">SERM-Übung-Powerpoint</Link>
            </div>
        </div>
    );
};

export default DatenbankPage;
