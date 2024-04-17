import React, { useState, useRef, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom';
import { useTrail, useSpring, animated } from 'react-spring';
import '../App.css';
import SoftwarePage from './subPages/software/SoftwarePage';
import WebPage from './subPages/web/WebPage';
import MobilePage from './subPages/mobile/MobilePage';
import DatenbankPage from './subPages/datenbank/DatenbankPage';
import MediengestaltungPage from './subPages/mediengestaltung/MediengestaltungPage';
import AudioVideoPage from './subPages/audioVideo/AudioVideoPage';
import ModellPage from './subPages/modell/ModellPage';
import SERMPage from './subPages/datenbank/SERMPage';
import LogoPage from "./subPages/mediengestaltung/LogoPage";
import WebDesignPage from "./subPages/mediengestaltung/WebDesignPage";
import Login from "./serverRelated/Login";
import Register from "./serverRelated/Register";
import Background from "./general_structure/Background";
import MainPage from "./MainPage";
import Footer from "./general_structure/footer"
import Header from "./general_structure/header"


const AppContent = () => {

    return (
        <div className="app">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/software" element={<SoftwarePage/>}/>
                    <Route path="/web" element={<WebPage/>}/>
                    <Route path="/mobile" element={<MobilePage/>}/>
                    <Route path="/datenbank" element={<DatenbankPage/>}/>
                    <Route path="/mediengestaltung" element={<MediengestaltungPage/>}/>
                    <Route path="/audiovideo" element={<AudioVideoPage/>}/>
                    <Route path="/modell" element={<ModellPage/>}/>
                    <Route path="/serm" element={<SERMPage/>}/>
                    <Route path="/logo" element={<LogoPage/>}/>
                    <Route path="/webdesign" element={<WebDesignPage/>}/>
                </Routes>
            </div>
            <Footer/>
            <Background/>
        </div>
    );
};

export default AppContent;