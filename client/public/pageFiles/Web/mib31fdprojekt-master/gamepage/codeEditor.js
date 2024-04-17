//the code editor field
let editor = CodeMirror(document.getElementById('codeMirror'), {
    value: "enter your code in here",
    lineNumbers: true,
    theme: 'default',
    autoCloseBrackets: true,
    matchBrackets: true,
    autoCloseTags: true,
    lineWrapping: true,
});
editor.setSize(null, "100%");

//placeholder for the different levels
if (level === 0 || level === 1 || level === 2) {
    editor.setValue("<!DOCTYPE html>\n" +
        "<html lang=\"de\">\n" +
        "<head>\n"+
        "    <meta charset=\"utf-8\">\n" +
        "    <title>" + "Level " + level + "</title>\n" +
        "  </head>\n" +
        "  <body>\n" +
        "  <!-- Schreibe hier deinen HTML-Code -->\n" +
        "        \n" +
        "        \n" +
        "  </body>\n" +
        "</html>");
} else if (level === 3) {
    editor.setValue("<!DOCTYPE html>\n" +
        "<html lang=\"de\">\n" +
        "<head>\n"+
        "    <meta charset=\"utf-8\">\n" +
        "    <title>" + "Level " + level + "</title>\n" +
        "    <style>\n" +
        "    /* Schreibe hier deinen CSS-Code */\n" +
        "        \n" +
        "    </style>\n" +
        "  </head>\n" +
        "  <body>\n" +
        "<header id=\"tower1\" class=\"tower\"></header>\n"+
        "<nav id=\"tower2\" class=\"tower\"></nav>\n"+
        "<div id=\"tower3\" class=\"tower\"></div>\n"+
        "<table id=\"tower4\" class=\"tower\"></table>\n"+
        "<footer id=\"tower5\" class=\"tower\"></footer>\n"+
        "  </body>\n" +
        "</html>");
}else if (level === 4) {
    editor.setValue("<!DOCTYPE html>\n" +
        "<html lang=\"de\">\n" +
        "<head>\n"+
        "    <meta charset=\"utf-8\">\n" +
        "    <title>" + "Level " + level + "</title>\n" +
        "    <style>\n" +
        "    /* Schreibe hier deinen CSS-Code */\n" +
        "        \n" +
        "    </style>\n" +
        "  </head>\n" +
        "  <body>\n" +
        "<header id=\"tower1\" class=\"tower\"></header>\n"+
        "<nav id=\"tower2\" class=\"tower\"></nav>\n"+
        "<div id=\"tower3\" class=\"tower\"></div>\n"+
        "<table id=\"tower4\" class=\"tower\"></table>\n"+
        "<div id=\"tower5\" class=\"tower\"></div>\n"+
        "<div id=\"tower6\" class=\"tower\"></div>\n"+
        "<footer id=\"tower7\" class=\"tower\"></footer>\n"+
        "  </body>\n" +
        "</html>");
} else if (level === 5) {
    editor.setValue("<!DOCTYPE html>\n" +
        "<html lang=\"de\">\n" +
        "<head>\n"+
        "    <meta charset=\"utf-8\">\n" +
        "    <title>" + "Level " + level + "</title>\n" +
        "    <style>\n" +
        "    /* Schreibe hier deinen CSS-Code */\n" +
        "        \n" +
        "    </style>\n" +
        "  </head>\n" +
        "  <body>\n" +
        "  <!-- Schreibe hier deinen HTML-Code -->\n" +
        "        \n" +
        "  </body>\n" +
        "</html>");
}


// Function to set mode based on language
function setEditorMode(language) {
    switch (language) {
        case 'text/html':
            editor.setOption('mode', 'text/html');
            break;
        case 'htmlmixed':
            editor.setOption('mode', 'htmlmixed');
            break;
        case 'css':
            editor.setOption('mode', 'css');
            break;
        case 'javascript':
            editor.setOption('mode', 'javascript');
            break;
        default:
            console.error("Unsupported language:", language);
            break;
    }
    editor.refresh();
}

editor.on('change', function () {
    if (applyDynamic) {
        applyDynamicChanges();
    }
});