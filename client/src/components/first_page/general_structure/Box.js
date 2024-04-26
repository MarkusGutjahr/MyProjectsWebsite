import React, { useState, useRef, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom';
import { useTrail, useSpring, animated } from 'react-spring';
import '../../App.css';
import './Box.css';
import './aspect-ratio-styles.css';

const Box = ({to, id, children}) => {
    const [hovered, setHovered] = React.useState(false);
    const [zIndex, setZIndex] = React.useState(1);

    const springProps = useSpring({
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
    });

    React.useEffect(() => {
        setZIndex(hovered ? 2 : 1);
    }, [hovered]);

    return (
        <Link to={to} style={{textDecoration: 'none'}}>
            <animated.div
                id={id}
                className={`box ${id} ${hovered ? 'glow' : ''}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    ...springProps,
                    position: 'relative',
                    zIndex: zIndex,
                    overflow: 'hidden'
                }}
            >

                <div
                    className="gray-layer"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.0)',
                        zIndex: 1
                    }}
                ></div>

                <div className="box-text">{children}</div>
            </animated.div>
        </Link>
    );
};

export default Box;