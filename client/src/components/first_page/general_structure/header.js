import React, { useState, useRef, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom';
import Login from "../serverRelated/Login";
import Register from "../serverRelated/Register";
import MainPage from "../MainPage";
import SoftwarePage from "../subPages/software/SoftwarePage";
import WebPage from "../subPages/web/WebPage";
import MobilePage from "../subPages/mobile/MobilePage";
import DatenbankPage from "../subPages/datenbank/DatenbankPage";
import MediengestaltungPage from "../subPages/mediengestaltung/MediengestaltungPage";
import AudioVideoPage from "../subPages/audioVideo/AudioVideoPage";
import ModellPage from "../subPages/modell/ModellPage";
import SERMPage from "../subPages/datenbank/SERMPage";
import LogoPage from "../subPages/mediengestaltung/LogoPage";
import WebDesignPage from "../subPages/mediengestaltung/WebDesignPage";
import './header.css';
import AuthForm from "../serverRelated/AuthForm";
import MPPage from "../subPages/web/MPPage";
import FDPage from "../subPages/web/FDPage";
import MowAppPage from "../subPages/mobile/MowAppPage";

const Header = () => {
    const location = useLocation();
    const menuRef = useRef();
    const loginRef = useRef();
    const loginPopRef = useRef();
    const [showMenu, setShowMenu] = useState(false);

    const [showLogin, setShowLogin] = useState(false);

    const headerRef = useRef();
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);


    const toggleMenu = () => {
        setShowMenu(!showMenu);
        if (showLogin) {
            setShowLogin(false);
        }
    };

    const toggleLogin = () => {
        setShowLogin(!showLogin);
        if (showMenu) {
            setShowMenu(false);
        }
    };


    const contains = (parent, child) => {
        let node = child.parentNode;
        while (node != null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };

    const handleClickOutside = (event) => {
        if (
            menuRef.current && !contains(menuRef.current, event.target)) {
            setShowMenu(false);
        }

        if (
            loginRef.current && !contains(loginRef.current, event.target) &&
            loginPopRef.current && !contains(loginPopRef.current, event.target)
        ) {
            setShowLogin(false);
        }

    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const goBack = () => {
        window.history.back(); // Go back to the previous page
    };


    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setLoggedIn(false);
    };


    const handleScroll = () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollTop > lastScrollTop) {
            // Downscroll
            setShowHeader(false);
        } else {
            // Upscroll
            setShowHeader(true);
        }

        setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollTop]);


    return (
        <div className={`header-container ${showHeader  ? 'show' : 'hide'}`} ref={headerRef}>
            <div className="header">
                <div className="header-left">
                    {location.pathname !== "/" && (
                        <span className="back-arrow" onClick={goBack}>&#8592;</span>
                    )}
                    <Link to="/" id="page-logo">
                        {/*
                        <svg width="5vw" height="5vh" viewBox="0 0 47 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_f_1_13)">
                                <path d="M5 39L9.93333 22L14.8667 5L23.9111 21.32L32.9556 5L42 39" stroke="#CBCBCB"
                                      stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <path
                                d="M43.4693 26.5767C42.4771 30.7975 40.1401 34.5816 36.8104 37.3588C33.4807 40.1361 29.3386 41.756 25.0082 41.9746C20.6778 42.1931 16.3937 40.9985 12.8013 38.5707C9.20882 36.1429 6.50266 32.6133 5.09049 28.5139C3.67832 24.4144 3.63663 19.967 4.97171 15.8417C6.30678 11.7165 8.94631 8.13687 12.4926 5.64213C16.0389 3.14738 20.2999 1.87267 24.6336 2.01004C28.9674 2.14741 33.1391 3.68941 36.5203 6.40374L32.9043 10.908C30.4996 8.97762 27.5327 7.88096 24.4506 7.78326C21.3685 7.68557 18.3381 8.59214 15.816 10.3664C13.2939 12.1406 11.4167 14.6864 10.4672 17.6203C9.5177 20.5541 9.54734 23.7171 10.5517 26.6326C11.556 29.5481 13.4806 32.0583 16.0355 33.785C18.5905 35.5116 21.6373 36.3612 24.717 36.2058C27.7968 36.0503 30.7426 34.8983 33.1107 32.9231C35.4788 30.948 37.1408 28.2567 37.8465 25.2549L43.4693 26.5767Z"
                                fill="white"/>
                            <path d="M25 26H41V43" stroke="white" stroke-width="5"/>
                            <defs>
                                <filter id="filter0_f_1_13" x="-0.0010376" y="-0.000116348" width="47.002"
                                        height="44.0012" filterUnits="userSpaceOnUse"
                                        color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                    <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_1_13"/>
                                </filter>
                            </defs>
                        </svg>
                        */}
                        {/*
                            <svg width="5vw" height="5vh" viewBox="0 0 47 44" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_f_2_2)">
                                    <path d="M5 39L9.93333 22L14.8667 5L23.9111 21.32L32.9556 5L42 39" stroke="#00FFA3"
                                          stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                                <path
                                    d="M43.4693 26.5767C42.4771 30.7975 40.1401 34.5816 36.8104 37.3588C33.4807 40.1361 29.3386 41.756 25.0082 41.9746C20.6778 42.1931 16.3937 40.9985 12.8013 38.5707C9.20882 36.1429 6.50266 32.6133 5.09049 28.5139C3.67832 24.4144 3.63663 19.967 4.97171 15.8417C6.30678 11.7165 8.94631 8.13687 12.4926 5.64213C16.0389 3.14738 20.2999 1.87267 24.6336 2.01004C28.9674 2.14741 33.1391 3.68941 36.5203 6.40374L32.9043 10.908C30.4996 8.97762 27.5327 7.88096 24.4506 7.78326C21.3685 7.68557 18.3381 8.59214 15.816 10.3664C13.2939 12.1406 11.4167 14.6864 10.4672 17.6203C9.5177 20.5541 9.54734 23.7171 10.5517 26.6326C11.556 29.5481 13.4806 32.0583 16.0355 33.785C18.5905 35.5116 21.6373 36.3612 24.717 36.2058C27.7968 36.0503 30.7426 34.8983 33.1107 32.9231C35.4788 30.948 37.1408 28.2567 37.8465 25.2549L43.4693 26.5767Z"
                                    fill="#4200FF"/>
                                <path d="M25 26H41V43" stroke="#4200FF" stroke-width="5"/>
                                <defs>
                                    <filter id="filter0_f_2_2" x="-0.0010376" y="-0.000114441" width="47.002"
                                            height="44.0012" filterUnits="userSpaceOnUse"
                                            color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix"
                                                 result="shape"/>
                                        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_2_2"/>
                                    </filter>
                                </defs>
                            </svg>
                        */}
                        <svg width="5vw" height="5vh" viewBox="0 0 47 44" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_f_2_6)">
                                <path d="M5 39L9.93333 22L14.8667 5L23.9111 21.32L32.9556 5L42 39" stroke="#4200FF"
                                      stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <path
                                d="M43.4693 26.5767C42.4771 30.7975 40.1401 34.5816 36.8104 37.3588C33.4807 40.1361 29.3386 41.756 25.0082 41.9746C20.6778 42.1931 16.3937 40.9985 12.8013 38.5707C9.20882 36.1429 6.50266 32.6133 5.09049 28.5139C3.67832 24.4144 3.63663 19.967 4.97171 15.8417C6.30678 11.7165 8.94631 8.13687 12.4926 5.64213C16.0389 3.14738 20.2999 1.87267 24.6336 2.01004C28.9674 2.14741 33.1391 3.68941 36.5203 6.40374L32.9043 10.908C30.4996 8.97762 27.5327 7.88096 24.4506 7.78326C21.3685 7.68557 18.3381 8.59214 15.816 10.3664C13.2939 12.1406 11.4167 14.6864 10.4672 17.6203C9.5177 20.5541 9.54734 23.7171 10.5517 26.6326C11.556 29.5481 13.4806 32.0583 16.0355 33.785C18.5905 35.5116 21.6373 36.3612 24.717 36.2058C27.7968 36.0503 30.7426 34.8983 33.1107 32.9231C35.4788 30.948 37.1408 28.2567 37.8465 25.2549L43.4693 26.5767Z"
                                fill="#00FFA3"/>
                            <path d="M25 26H41V43" stroke="#00FFA3" stroke-width="5"/>
                            <defs>
                                <filter id="filter0_f_2_6" x="-0.00103784" y="-0.000114441" width="47.002"
                                        height="44.0012" filterUnits="userSpaceOnUse"
                                        color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix"
                                             result="shape"/>
                                    <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_2_6"/>
                                </filter>
                            </defs>
                        </svg>
                    </Link>
                </div>
                <div className="header-center">
                    <Routes>
                        <Route path="/" element={<MainPageTitle/>}/>
                        <Route path="/software" element={<SoftwarePageTitle/>}/>
                        <Route path="/web" element={<WebPageTitle/>}/>
                        <Route path="/mobile" element={<MobilePageTitle/>}/>
                        <Route path="/datenbank" element={<DatenbankPageTitle/>}/>
                        <Route path="/mediengestaltung" element={<MediengestaltungPageTitle/>}/>
                        <Route path="/audiovideo" element={<AudioVideoPageTitle/>}/>
                        <Route path="/modell" element={<ModellPageTitle/>}/>

                        <Route path="/serm" element={<SERMPageTitle/>}/>
                        <Route path="/logo" element={<LogoPageTitle/>}/>
                        <Route path="/webdesign" element={<WebDesignPageTitle/>}/>

                        <Route path="/medienprojekt" element={<MPPageTitle/>}/>
                        <Route path="/frontenddevelopment" element={<FDPageTitle/>}/>

                        <Route path="/blackjack" element={<BlackjackPageTitle/>}/>
                        <Route path="/swep" element={<SWEPPageTitle/>}/>

                        <Route path="/mowapp" element={<MowAppPageTitle/>}/>

                    </Routes>
                </div>
                <div className="header-right">
                    <div ref={menuRef}>
                        <div className="menu-icon" onClick={toggleMenu}>
                            {/*
                            <svg width="2vw" height="4vh" viewBox="0 0 11 12" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 11L5.5 11L11 11" stroke="white" stroke-width="2"/>
                                <path d="M0 6L5.5 6L11 6" stroke="white" stroke-width="2"/>
                                <path d="M0 1L5.5 1L11 1" stroke="white" stroke-width="2"/>
                            </svg>
                            */}
                            <svg width="2vw" height="4vh" viewBox="0 0 9 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 9L4.5 9L9 9" stroke="white"/>
                                <path d="M0 5L4.5 5L9 5" stroke="white"/>
                                <path d="M0 1L4.5 1L9 1" stroke="white"/>
                            </svg>
                        </div>
                    </div>

                    <div ref={loginRef}>
                        <div className="menu-icon" onClick={toggleLogin}>
                            <svg width="2vw" height="4vh" viewBox="0 0 28 56" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M24.5 13.5C24.5 19.5751 19.5751 24.5 13.5 24.5C7.42487 24.5 2.5 19.5751 2.5 13.5C2.5 7.42487 7.42487 2.5 13.5 2.5C19.5751 2.5 24.5 7.42487 24.5 13.5Z"
                                    stroke="white" stroke-width="5"/>
                                <mask id="path-2-inside-1_25_3" fill="white">
                                    <path
                                        d="M19.9695 20.7661C22.8566 22.5645 25.192 25.6125 26.5886 29.4051C27.9852 33.1976 28.3592 37.5069 27.6486 41.6188C26.938 45.7306 25.1855 49.3982 22.6814 52.0136C20.1774 54.629 17.0723 56.0353 13.8806 55.9993C10.6889 55.9633 7.60234 54.4873 5.13245 51.8158C2.66255 49.1443 0.95761 45.4378 0.30019 41.3105C-0.35723 37.1832 0.0723417 32.883 1.51771 29.1225C2.96308 25.362 5.33747 22.367 8.24736 20.6339L9.90679 25.4992C7.8363 26.7323 6.14683 28.8634 5.1184 31.5391C4.08997 34.2148 3.78431 37.2746 4.25209 40.2113C4.71987 43.148 5.93299 45.7853 7.69041 47.6862C9.44784 49.5871 11.644 50.6373 13.915 50.6629C16.186 50.6885 18.3955 49.6879 20.1772 47.827C21.9589 45.966 23.2059 43.3564 23.7115 40.4307C24.2171 37.5049 23.951 34.4387 22.9573 31.7402C21.9635 29.0416 20.3018 26.8728 18.2475 25.5932L19.9695 20.7661Z"/>
                                </mask>
                                <path
                                    d="M19.9695 20.7661C22.8566 22.5645 25.192 25.6125 26.5886 29.4051C27.9852 33.1976 28.3592 37.5069 27.6486 41.6188C26.938 45.7306 25.1855 49.3982 22.6814 52.0136C20.1774 54.629 17.0723 56.0353 13.8806 55.9993C10.6889 55.9633 7.60234 54.4873 5.13245 51.8158C2.66255 49.1443 0.95761 45.4378 0.30019 41.3105C-0.35723 37.1832 0.0723417 32.883 1.51771 29.1225C2.96308 25.362 5.33747 22.367 8.24736 20.6339L9.90679 25.4992C7.8363 26.7323 6.14683 28.8634 5.1184 31.5391C4.08997 34.2148 3.78431 37.2746 4.25209 40.2113C4.71987 43.148 5.93299 45.7853 7.69041 47.6862C9.44784 49.5871 11.644 50.6373 13.915 50.6629C16.186 50.6885 18.3955 49.6879 20.1772 47.827C21.9589 45.966 23.2059 43.3564 23.7115 40.4307C24.2171 37.5049 23.951 34.4387 22.9573 31.7402C21.9635 29.0416 20.3018 26.8728 18.2475 25.5932L19.9695 20.7661Z"
                                    stroke="white" stroke-width="16" mask="url(#path-2-inside-1_25_3)"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`menu ${showMenu ? 'show' : ''}`}>
                <Link to="/software">Software</Link>
                <Link to="/web">Web</Link>
                <Link to="/mobile">Mobile</Link>
                <Link to="/datenbank">Datenbank</Link>
                <Link to="/mediengestaltung">Mediengestaltung</Link>
                <Link to="/audiovideo">AudioVideo</Link>
                <Link to="/modell">Modell</Link>
            </div>

            <div ref={loginPopRef} className={`menu ${showLogin ? 'show' : ''}`}>
                {!loggedIn ? (
                    <li>
                        <AuthForm onLogin={handleLogin} />
                    </li>
                ) : (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </div>


        </div>
    );
};

const MainPageTitle = () => {
    return <h1 className="title">Main Page</h1>;
};

const SoftwarePageTitle = () => {
    return <h1 className="title">Software Page</h1>;
};

const WebPageTitle = () => {
    return <h1 className="title">Web Page</h1>;
};

const MobilePageTitle = () => {
    return <h1 className="title">Mobile Page</h1>;
};

const DatenbankPageTitle = () => {
    return <h1 className="title">Datenbank Page</h1>;
};

const MediengestaltungPageTitle = () => {
    return <h1 className="title">Mediengestaltung Page</h1>;
};

const AudioVideoPageTitle = () => {
    return <h1 className="title">AudioVideo Page</h1>;
};

const ModellPageTitle = () => {
    return <h1 className="title">Modell Page</h1>;
};

const SERMPageTitle = () => {
    return <h1 className="title">SERM Page</h1>;
};

const LogoPageTitle = () => {
    return <h1 className="title">Logo Page</h1>;
};

const WebDesignPageTitle = () => {
    return <h1 className="title">WebDesign Page</h1>;
};

const MPPageTitle = () => {
    return <h1 className="title">Medienprojekt Page</h1>;
};

const FDPageTitle = () => {
    return <h1 className="title">Frontend Development Page</h1>;
};

const BlackjackPageTitle = () => {
    return <h1 className="title">Blackjack Page</h1>;
};

const SWEPPageTitle = () => {
    return <h1 className="title">Software Entwicklungs Projekt Page</h1>;
};

const MowAppPageTitle = () => {
    return <h1 className="title">Mobile Game Page</h1>;
};

export default Header;