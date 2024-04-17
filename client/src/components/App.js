import React, { useState, useRef, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom';
import { useTrail, useSpring, animated } from 'react-spring';
import './App.css';
import SoftwarePage from './first_page/subPages/software/SoftwarePage';
import WebPage from './first_page/subPages/web/WebPage';
import MobilePage from './first_page/subPages/mobile/MobilePage';
import DatenbankPage from './first_page/subPages/datenbank/DatenbankPage';
import MediengestaltungPage from './first_page/subPages/mediengestaltung/MediengestaltungPage';
import AudioVideoPage from './first_page/subPages/audioVideo/AudioVideoPage';
import ModellPage from './first_page/subPages/modell/ModellPage';
import SERMPage from './first_page/subPages/datenbank/SERMPage';
import LogoPage from "./first_page/subPages/mediengestaltung/LogoPage";
import WebDesignPage from "./first_page/subPages/mediengestaltung/WebDesignPage";
import Login from "./first_page/serverRelated/Login";
import Register from "./first_page/serverRelated/Register";
import Background from "./first_page/general_structure/Background";
import AppContent from "./first_page/AppContent";

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;
