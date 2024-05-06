import React, {useEffect, useState} from 'react';
import './ScrollArrow.css';


const ScrollArrow = () => {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight));
            const newOpacity = 1 - 5 * scrollPercentage;
            setOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <svg className="arrows" style={{ opacity }}>
            <path className="arrow1" d="M0 0 L60 64 L120 0"></path>
            <path className="arrow2" d="M0 40 L60 104 L120 40"></path>
            <path className="arrow3" d="M0 80 L60 144 L120 80"></path>
        </svg>
    );
};

export default ScrollArrow;
