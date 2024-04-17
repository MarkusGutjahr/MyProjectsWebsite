import React from 'react';
import "./softwarePage.css";

const SoftwarePage = () => {
    return (
        <div>
            <h2>Software Page</h2>
            <p>This is the Software page content.</p>
            <object type="application/x-java-applet" width="100%" height="600" alt="jar file" title="jar title">
                <param name="codebase" value="http://localhost:3000/pageFiles/Software/BlackJack/" />
                <param name="archive" value="http://localhost:3000/pageFiles/Software/BlackJack/blackjack.jar" />
                <param name="code" value="miniprojektBlackJack.Spielablauf" />
                <noembed>Your browser does not support Java!</noembed>
            </object>
        </div>
    );
};

export default SoftwarePage;
