import React from 'react';

const BlackjackPage = () => {
    return (
        <div>
            <p>Pages Content</p>

            <object type="application/x-java-applet" width="100%" height="600" alt="jar file" title="jar title">
                <param name="codebase" value="http://localhost:3000/pageFiles/Software/BlackJack/"/>
                <param name="archive" value="http://localhost:3000/pageFiles/Software/BlackJack/blackjack.jar"/>
                <param name="code" value="miniprojektBlackJack.Spielablauf"/>
                <noembed>Your browser does not support Java!</noembed>
            </object>
        </div>
    )
        ;
};

export default BlackjackPage;
