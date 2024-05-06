import React, { useState, useRef, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom';
import { useTrail, useSpring, animated } from 'react-spring';
import '../App.css';
import Box from "./general_structure/Box";
import './general_structure/aspect-ratio-styles.css';
import './general_structure/Box.css';
import BoxContainer from "./general_structure/BoxContainer";
import './general_structure/BoxesStyles.css';
import ScrollArrow from "./new_general_structure/ScrollArrow";
import ContentBlock from "./new_general_structure/ContentBlock";
import Background from "./new_general_structure/Background";

const MainPage = () => {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            console.log("Scrolling detected");
            if (window.scrollY > 0) {
                setShowContent(true);
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="container" style={{minHeight: '100vh', overflowY: 'auto'}}>
            <h1>Welcome</h1>
            <ScrollArrow />

            {showContent && (
                <div className="content" style={{ minHeight: 'calc(100vh - 64px)' }}>
                    <ContentBlock />
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
            )}
            <Background/>
        </div>
    );
};

export default MainPage;
