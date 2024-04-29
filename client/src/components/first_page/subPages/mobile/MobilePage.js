import React from 'react';
import BoxContainer from "../../general_structure/BoxContainer";

const MobilePage = () => {
    const items = [
        {to:"/mowapp", id:"appprev", text:"Mobile Game"},
    ];

    return (
        <div className="mobile-page multiboxes">
            <BoxContainer items={items}/>
        </div>
    );
};

export default MobilePage;
