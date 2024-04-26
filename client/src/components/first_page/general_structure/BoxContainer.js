import React from 'react';
import { useTrail, animated } from 'react-spring';
import Box from './Box';

const BoxContainer = ({ items }) => {
    const trail = useTrail(items.length, {
        from: { opacity: 0, transform: 'translateX(-100%)' },
        to: { opacity: 1, transform: 'translateX(0%)' },
        config: { tension: 200, friction: 20 },
    });

    return (
        <div className="box-container">
            {trail.map((style, index) => (
                <animated.div className="animBox" key={index} style={style}>
                    <Box to={items[index].to} id={items[index].id}>
                        {items[index].text}
                    </Box>
                </animated.div>
            ))}
        </div>
    );
};

export default BoxContainer;
