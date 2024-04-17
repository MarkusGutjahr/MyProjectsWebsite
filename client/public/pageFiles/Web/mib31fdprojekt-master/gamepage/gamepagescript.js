//document.addEventListener('DOMContentLoaded', function () {
    let timeoutId;
    let userCodePresent = false;
    let applyDynamic = false; // Initially set to true for dynamic changes


    // Function to get the value of a URL parameter
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        //console.log("urlParams.get(name): " + urlParams.get(name))
        return urlParams.get(name);
    }

 function openModal(text) {
            const modal = document.getElementById('myModal');
            const modalText = document.getElementById('modalText');
            modalText.innerHTML = text;
            modal.style.display = 'block';
            console.log(text);
        }

        // Function to close the modal
        function closeModal() {
            const modal = document.getElementById('myModal');
            modal.style.display = 'none';
        }

    // Get the level from the URL
    const level = parseInt(getQueryParam('level')) || 0; // Default to level 0 if not specified
    console.log("Level " + level + " wurde geöffnet.")

// Dynamically set the heading based on the level
    const levelHeading = document.getElementById('levelueberschrift');
    levelHeading.innerHTML = `<h1>Level ${level}</h1>`;

 // Dynamically set the text under the heading based on the level
    const levelTextContainer = document.getElementById('levelText');
    switch (level) {
        case 0:
            openModal('Willkommen in Towers Of Tags!<br><p>Auf der rechten Seite siehst du das Spielbrett, startest du später das Level und dein Code wird ausgeführt fangen dort Gegner an den gekenntzeichneten Weg entlang zu laufen. Schaffen es die Gegner bis zum Ende des Weges haben sie gewonnen und das gilt es zu vermeiden! Wie? Indem du links im Code Editor HTML & CSS Code schreibst und damit Tower platzierst die die Gegner abschießen und sie daran hindern ihr Ziel zu erreichen.</p><p>HTML Code wird hierfür bitte unter der Kommentar-Zeile Schreibe hier deinen HTML-Code geschrieben während CSS Code unter dem dementsprechenden Kommentar in späteren Leveln geschrieben werden soll.</p><p>Fangen wir in diesem Level erstmal ganz einfach an: Platziere bitte ein paar Tower indem du div-Tags in den Code Editor schreibst und dann deinen Code via den Button Run Code ausführst.</p><p>Ein div ist wie eine unsichtbare Box auf einer Webseite. Du kannst sie verwenden, um Dinge zu gruppieren, ähnlich wie in einem Ordner auf deinem Computer. Zum Beispiel könntest du Texte, Bilder oder Buttons in einem div zusammenfassen, um sie gemeinsam zu gestalten oder zu organisieren. Es hilft dabei, deine Webseite strukturierter zu machen und den Code leichter zu lesen.</p>');
            levelTextContainer.innerHTML = '<strong>Aufgabenstellung: </strong>Erstelle einen Tower indem du einen div Tag schreibst und die Gegnerwelle startest';
            break;

        case 1:
            openModal('<p>In diesem Level behandeln wir Inline-Elemente und Block-Elemente. Beide sind zwei Arten von HTML-Elementen, die sich in ihrem Verhalten in Bezug auf den Fluss und die Darstellung im Dokument unterscheiden.</p><br><p>Block-Elemente nehmen die <strong>volle Breite des Containers</strong> ein und beginnen auf einer neuen Zeile. Sie erzwingen Zeilenumbrüche vor und nach dem Element. Beispiele für Block-Elemente sind in diesem Spiel sind div,ul & li</p><br><p>Inline-Elemente nehmen nur <strong>die Breite des Inhalts ein</strong>und bleiben im Fluss des Textes oder anderer Inline-Elemente. Sie erzwingen keinen Zeilenumbruch und können neben anderen Inline-Elementen stehen. Beispiele für Inline-Elemente in diesem Spiel sind span & a</p>');
            levelTextContainer.innerHTML = '<strong>Aufgabenstellung: </strong>Benutze eine Kombination aus div und span Elementen!';
            break;
        case 2:
            openModal('In diesem Level behandeln wir Semantische Elemente. Semantische HTML-Elemente sind spezielle Befehle in HTML, die nicht nur sagen, wie etwas aussehen soll, sondern auch, welche Bedeutung oder Art von Inhalt es hat. Stell dir vor, du schreibst einen Brief: Du verwendest Überschriften, Absätze und Unterschriften, damit andere verstehen können, wie der Brief strukturiert ist. Genau das tun semantische HTML-Elemente für Webseiten.<br>Hier sind einige Beispiele:<br>header: Wie der Betreff in einem Brief - es sagt, dass hier der Kopfbereich der Seite beginnt, vielleicht mit dem Titel oder einem Logo.<br>nav: Wie die Anleitung, wie man von einem Abschnitt zum anderen geht - es zeigt an, dass hier die Navigation oder die Links zu anderen Seiten sind.<br>main: Das ist wie der Hauptteil deines Briefes - es sagt, dass hier der Hauptinhalt der Seite beginnt.<br>article: Wie ein einzelner Artikel in einer Zeitschrift - es sagt, dass hier ein eigenständiger Inhalt oder Beitrag ist.<br>section: Wie verschiedene Abschnitte in deinem Brief - es hilft, den Inhalt in logische Teile zu gliedern.<br>aside: Wie eine kleine Randbemerkung in einem Buch - es zeigt an, dass hier zusätzliche Informationen oder Nebeninhalte stehen.<br>footer: Wie der Schlussgruß in einem Brief - es sagt, dass hier der Fußbereich der Seite ist, oft mit Copyright-Informationen oder Links.<br>');
            levelTextContainer.innerHTML = '<strong>Aufgabenstellung: </strong>Benutze zusätzlich Semantische Elemente!'; // Customize the text for Level 2
            break;

        case 3:
            openModal('<p>In diesem Level fangen wir mit CSS an und behandeln IDs & Klassen. IDs und Klassen in HTML und CSS dienen dazu, Elemente auf einer Webseite zu kennzeichnen und zu gruppieren.</p><p>IDs sind wie einzigartige Namensschilder für bestimmte HTML-Elemente und sollten auf einer Seite einmalig sein, um Verwechslungen zu vermeiden. Man verwendet IDs in CSS oder JavaScript, um spezifische Elemente anzusprechen.<br>Syntax: div id=\"selbstgewaehlterName\"<br>#selbstgewaehlterName{attribut:wert}</p><p>Klassen sind wie Etiketten, die mehreren HTML-Elementen gemeinsam sein können. Mehrere Elemente können dieselbe Klasse haben, und Klassen werden verwendet, um Gruppen von Elementen zu stylen oder zu verarbeiten. <br>Syntax: div class=\"selbstgewaehlterName\"<br>.selbstgewaehlterName{attribut:wert}</p>');
            levelTextContainer.innerHTML ='<strong>Aufgabenstellung:</strong>Gib 2 Towern dieselbe Eigenschaft und einem eine andere';
            break;

        case 4:
            openModal('<p>In diesem Level wenden wir uns Positionierungsmethoden zu und erkunden Float: <br>Die float-Eigenschaft in CSS wird verwendet, um ein Element im Fluss zu positionieren und es nach links oder rechts zu verschieben.</p><p>Wenn ein Element mit float positioniert wird, wird es aus dem normalen Fluss des Dokuments genommen, und andere Elemente fließen um das gefloated Element herum. Der float-Wert kann "left" oder "right" sein, wodurch das Element entsprechend nach links oder rechts verschoben wird.</p>');
            levelTextContainer.innerHTML ='<strong>Aufgabenstellung: Positioniere die Tower mit Hilfe von left,right,top und bottom so das sie die Gegner effektiv abschießen können</strong>';
            break;
        // Add more cases for other levels as needed

    }



    // Post the level value to the embedded frame
    const gameFrame = document.getElementById('embedded-iframe');
    gameFrame.onload = function() {
        // Wait for the iframe to load before posting the message
        gameFrame.contentWindow.postMessage({ type: 'level', level: level }, '*');

        if(applyDynamic) {
            setTimeout(startEnemyWaveButton, 2000);
        }
    };


    //applying dynamic or by using the buttons
    if (!applyDynamic) {
        // If dynamic changes are turned off, show the buttons
        document.getElementById('applyButton').style.display = 'block';
        document.getElementById('enemyWaveButton').style.display = 'block';
    } else {
        // If dynamic changes are turned on, hide the buttons
        document.getElementById('applyButton').style.display = 'none';
        document.getElementById('enemyWaveButton').style.display = 'none';
    }

    // Function to apply changes dynamically
    function applyDynamicChanges() {
        // Get the JavaScript code entered by the user
        const customCode = editor.getValue();
        console.log(customCode);

        if(level === 0 || level === 1){
            setEditorMode('text/html');
        }else if(level === 2 || level === 3){
            setEditorMode('css');
        }else if(level === 4 || level === 5){
            setEditorMode('htmlmixed');
        }

        // Apply dynamic changes
        try {
            const iframe = document.getElementById('embedded-iframe');

            if (iframe) {
                const iframeWindow = iframe.contentWindow || iframe.contentDocument.defaultView;

                // Send user code to the iframe
                iframeWindow.postMessage({ type: 'executeUserCode', code: customCode }, '*');

            } else {
                console.error("Error: Iframe not found");
            }
        } catch (error) {
            console.error("Error in custom code:", error);
        }

    }

    // Function to apply changes using the button
    function applyButtonChanges() {
        applyDynamicChanges();
        console.log('Button-triggered code applied:');
    }

    // Function to start the enemy wave using the button
    function startEnemyWaveButton() {
        const iframe = document.getElementById('embedded-iframe');
        const iframeWindow = iframe.contentWindow || iframe.contentDocument.defaultView;
        // Send the go for starting the game to the iframe
        iframeWindow.postMessage({ type: 'enemyWave', do: 'start' }, '*');
        console.log('Start Enemy wave started');
    }

    // Listen for changes in the custom code input
    document.getElementById('codeMirror').addEventListener('input', function () {
        // Clear previous timeout
        clearTimeout(timeoutId);

        // Set a new timeout to apply changes after a delay if dynamic changes are active
        if (applyDynamic) {
            timeoutId = setTimeout(applyDynamicChanges, 500); // Adjust the delay as needed
        }
    });

/*
    // Toggle between dynamic and button-triggered code application
    document.getElementById('applyButton').addEventListener('click', function () {
        // Toggle the applyDynamic flag
        applyDynamic = !applyDynamic;
    });
 */

    // Listen for button click event
    document.getElementById('applyButton').addEventListener('click', function () {
        // Apply changes using the button
        applyButtonChanges();
    });

    // Listen for button click event
    document.getElementById('enemyWaveButton').addEventListener('click', function () {
        // Apply changes using the button
        startEnemyWaveButton();
    });

// Add an event listener to listen for messages from the iframe
    window.addEventListener('message', function (event) {
    const messageType = event.data.type;

    if (messageType === 'decrement') {
        decrementPlayerHealth();
    }
    if (messageType === 'resetPlayerHealthCount') {
        playerHealth = playerStartingHealth;
        updatePlayerHealth();
    }
    if (messageType === 'backToLevels'){
        window.location.href = "../mainpage/index.html#section_levelauswahl";
    }
});
//});




/*
example html code input:

<html>
    <div id="testDiv"></div>
</html>




<header>Tower1</header>
<nav>Tower2</nav>
<div>Tower3</div>
<div>Tower4</div>
<footer>Tower5</footer>





<header>Tower4</header>
<nav>Tower3</nav>
<div>Tower1</div>
<div>Tower2</div>
<span>Tower6</span>
<footer>Tower5</footer>

 */

/*
example css code input:
<css>
#tile-1-1 {
background-color: red;
}

#tile-2-3 {
    background-color: blue;
}
</css>

#tower1{
float: right
}

#tower1{
display: flex;
align-content: center;
}

#tower1{
display: flex;
justify-content: flex-end;
}

#tower1{
left:5em;
top:2em;
}

#tower1{
margin-left:200px
}

#tower3{
margin-left:200px
}

#tower1{
visibility:hidden
}

#tower1{
width: 100px;
height: 100px;
}

.tower{
display: flex;
justify-content: center;
}

.towerBox{
display: flex;
justify-content: center;
}

.tower{
float: right
}

.tower {
    position: absolute;
    right: 0;
}

.tower{
margin-left:200px;
}

.tower{
visibility:hidden
}

.tower{
left:5em
}

 */

/*
example js code input:
let targetRow1 = 3;
let targetColumn1 = 5;
let newColor1 = "blue";
matrix[targetRow1][targetColumn1].css('background-color', newColor1);

let targetRow2 = 4;
let targetColumn2 = 7;
let newColor2 = "purple";
matrix[targetRow2][targetColumn2].css('background-color', newColor2);

let targetRow3 = 6;
let targetColumn3 = 3;
let newColor3 = "rebeccapurple";
matrix[targetRow3][targetColumn3].css('background-color', newColor3);

<js>
matrix[3][5].css('background-color', "blue");
matrix[4][7].css('background-color', "purple");
matrix[6][3].css('background-color', "rebeccapurple");
</js>


matrix[4][5].css('background-color', 'blue');

changeMatrixColor(3, 5, 'blue');


let row = 3;
let column = 5;
let color = "blue";
changeMatrixColor(row, column, color);
 */
