window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'executeUserCode') {
        // Execute user code received from the main page and update the grid and path
        const userCode = event.data.code;

        // Execute the users code by type of code
        handleUserCode(userCode)

        // Execute user JavaScript code
        //eval(userCode)

        // Update the grid and path
        updateGridAndPath(userCode);
        //console.log("eventListener")
    }
});

function handleUserCode(userCode) {

    if (handleLevelCode === 0 || handleLevelCode === 1  || handleLevelCode === 2) {
        // Default to HTML code
        const htmlCodeMatch = userCode.match(/<body>([\s\S]*?)<\/body>/i);
        const htmlCode = htmlCodeMatch ? htmlCodeMatch[1] : '';

        console.log("Level for HTML");
        console.log("html code: " + htmlCode)
        handleHTMLCode(htmlCode);
    }else if (handleLevelCode === 3 || handleLevelCode === 4) {
        // User entered CSS code
        const cssCodeMatch = userCode.match(/<style>([\s\S]*?)<\/style>/i);
        const cssCode = cssCodeMatch ? cssCodeMatch[1] : '';

        console.log("Level for CSS");

        handleCSSCode(cssCode);
    } else if (handleLevelCode === 5) {
        // User entered HTML-CSS-Mix code
        const htmlCodeMatch = userCode.match(/<body>([\s\S]*?)<\/body>/i);
        const cssCodeMatch = userCode.match(/<style>([\s\S]*?)<\/style>/i);

        const htmlCode = htmlCodeMatch ? htmlCodeMatch[1] : '';
        const cssCode = cssCodeMatch ? cssCodeMatch[1] : '';

        console.log("Level for HTML & CSS");

        handleHTMLCode(htmlCode);
        handleCSSCode(cssCode);
    }else if (jsIsAllowed) {
        // User entered JavaScript code
        const jsCodeMatch = userCode.match(/<script>([\s\S]*?)<\/script>/i);
        const jsCode = jsCodeMatch ? jsCodeMatch[1] : '';

        console.log("Level for JS");

        handleJavaScriptCode(jsCode);
    }else {
        console.log("Error by differentiating between code languages!");
    }
}


let previousStyleElement = null;
function handleCSSCode(cssCode) {
    // Handle CSS code logic


    // Add !important to every property value
    const modifiedCSSCode = cssCode.replace(/([^;]+:[^;]+;)/g, function(match) {
        // Add !important to the property value
        return match.trim().replace(/;$/, ' !important;');
    });





    // Remove the previously added style element if it exists
    if (previousStyleElement) {
        document.head.removeChild(previousStyleElement);
    }

    // Create a style element
    const styleElement = document.createElement('style');

    // Set the innerText of the style element to the user's CSS code
    styleElement.innerText = modifiedCSSCode;

    // Append the style element to the document head
    document.head.appendChild(styleElement);

    // Update the reference to the current style element
    previousStyleElement = styleElement;

    updateAllTowers();

    console.log('Handling CSS code:', modifiedCSSCode);
}


//js deactivated
const jsIsAllowed = false;
function handleJavaScriptCode(jsCode) {
    // Handle JavaScript code logic

    //deactivated ---------------------------- !!!
    //eval(jsCode)

    console.log('Handling JavaScript code:', jsCode);
}

function handleHTMLCode(htmlCode) {
    // Create a temporary container element
    const tempContainer = document.createElement('div');
    //console.log("tempContainer: " + tempContainer);

    // Set the innerHTML of the container to the user's HTML code
    tempContainer.innerHTML = htmlCode;

    // Select all elements inside the body
    const elements = tempContainer.querySelectorAll('*');
    console.log('Number of elements:', elements.length);

    let i = 1;

    deleteAllTowers();

    // Loop through each child node
    elements.forEach(element  => {
        //console.log(node.nodeType);
        //console.log("aaaa");
        // Extract the tag name and content
        const tagName = element.tagName.toLowerCase();
        const content = element.innerHTML.trim();

            // Log the tag name and content (you can replace this with tower placement logic)
            console.log(`Tag: ${tagName}, Content: ${content}`);

            // Place a tower based on the tag type (replace this with your tower placement logic)
            placeTower(i, 1, tagName);
            i++;
    });

    //console.log("game.level: " + game.level);

    //Check if the current level is level 0 or 1
    if(game.level === 0 || game.level === 1 || game.level === 2) {
        //Place all user generated towers next to the path
        snapAllTowerToPath();
    }

}
