import React, { useState, useRef, useEffect } from 'react';
import './AnimationBlock.css';
import Background from './Background.js';

const AnimationBlock = () => {
    const [boxWidth, setBoxWidth] = useState(50);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            const newBoxWidth = Math.max(boxWidth - (scrollPercentage / 2), 0);
            setBoxWidth(newBoxWidth);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


        return (
            <div className="anim-container">
                <div className="anim-content">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet nisi in tellus pharetra
                        posuere. Curabitur lobortis purus vitae est vulputate, vel convallis neque malesuada. Vestibulum
                        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin eu sapien
                        semper, porta risus ac, sollicitudin lacus. Mauris at tortor vitae libero volutpat vestibulum.
                        Mauris vel sem ut nisi blandit semper non eget erat. Curabitur nec nisl libero. Vivamus vel
                        libero fringilla, feugiat tortor a, efficitur elit. Vestibulum auctor euismod augue, at maximus
                        est accumsan et. Sed consequat nulla et elit cursus, vitae interdum libero viverra. Maecenas sit
                        amet urna lacinia, faucibus libero eu, dictum nunc. Proin nec tristique mi, eget tincidunt elit.
                        Pellentesque sodales enim sit amet justo scelerisque, vel auctor turpis eleifend.
                    </p>
                </div>

                <div className="animationbox" style={{width: `${boxWidth}%`}}>
                    <div className="gradient"></div>
                </div>
            </div>
        );
    }
;

export default AnimationBlock;