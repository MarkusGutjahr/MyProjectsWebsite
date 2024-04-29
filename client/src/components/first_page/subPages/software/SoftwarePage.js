import React from 'react';
import "./softwarePage.css";
import BoxContainer from "../../general_structure/BoxContainer";
import '../../general_structure/BoxesStyles.css';

const SoftwarePage = () => {
    const items = [
        {to:"/blackjack", id:"blackjackprev", text:"BlackJack Projekt"},
        {to:"/swep", id:"swepprev", text:"Software Entwicklungs Projekt"},
    ]
    return (
        <div className="software-page multiboxes">
            <BoxContainer items={items}/>
        </div>
    );
};

export default SoftwarePage;
