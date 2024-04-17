import React, { useState, useRef, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom';
import { useTrail, useSpring, animated } from 'react-spring';
import '../App.css';
import './mainPage.css';
import Box from "./general_structure/Box";
import './general_structure/aspect-ratio-styles.css';
import './general_structure/Box.css';

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

    const trail = useTrail(items.length, {
        from: { opacity: 0, transform: 'translateX(-100%)' },
        to: { opacity: 1, transform: 'translateX(0%)' },
        config: { tension: 200, friction: 20 },
    });

    return (
        <div className="main-page">
            <div className="box-container">
                {trail.map((style, index) => (
                    <animated.div className="animBox" key={index} style={style}>
                        <Box to={items[index].to} id={items[index].id}>
                            {items[index].text}
                        </Box>
                    </animated.div>
                ))}
            </div>
        </div>
    );
};

export default MainPage;