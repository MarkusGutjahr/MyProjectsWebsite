import React, { useState, useRef, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom';
import { useTrail, useSpring, animated } from 'react-spring';
import '../App.css';
import './mainPage.css';
import Box from "./general_structure/Box";
import './general_structure/aspect-ratio-styles.css';
import './general_structure/Box.css';
import BoxContainer from "./general_structure/BoxContainer";
import './general_structure/MultiBoxes.css';

const MainPage = () => {
    const items = [
        { to: "/software", id: "softwareIMG", text: "Software" },
        { to: "/web", id: "webIMG", text: "Web" },
        { to: "/mobile", id: "mobileIMG", text: "Mobile" },
        { to: "/datenbank", id: "datenbankIMG", text: "Datenbank" },
        { to: "/mediengestaltung", id: "mediengestaltungIMG", text: "Mediengestaltung" },
        { to: "/audiovideo", id: "audiovideoIMG", text: "AudioVideo" },
        { to: "/modell", id: "modellIMG", text: "Modell" },
    ];

    return (
        <div className="main-page multiboxes">
            <BoxContainer items={items} />
        </div>
    );
};

export default MainPage;