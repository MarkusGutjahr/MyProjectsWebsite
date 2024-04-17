document.addEventListener('DOMContentLoaded', function() {

    setTimeout(() => {
        window.scrollTo(0, 0);
        window.scrollTo(0, 0);
    }, 0);

    gsap.from(".draggable", {
        duration: 1,
        scale: 0.1,
        opacity: 0,
        rotate: 270,
        y: '-500%',
        ease: 'power4.inOut',
        stagger: 0.1
    })

    gsap.from("#info", {
        duration: 1,
        scale: 0.1,
        opacity: 0,
        x: '-500%',
        ease: 'power1.inOut',
    })

    gsap.from("h1", {
        duration: 2,
        scale: 3,
        opacity: 0,
        y: '800%',
        ease: 'power4.inOut',
    })







    const target = document.getElementById('target');
    const draggables = document.querySelectorAll('.draggable');
    // Add drag and drop functionality to the cubes
    draggables.forEach((draggable, index) => {
        Draggable.create(draggable, {
            bounds: '#outer-box',
            onDragStart: function() {
                // Adjust the zIndex to make the draggable element appear above others
                gsap.set(draggable, { zIndex: 1 });
            },
            onDragEnd: function() {
                // Reset the zIndex when dragging ends
                gsap.set(draggable, { zIndex: 0 });

                // Check if the draggable element is within the target area
                if (this.hitTest(target, '80%')) {
                    if(draggable.id == "draggable1"){
                        //gsap.to(target, {backgroundColor: 'green'});
                        drag1InBox = true;
                        setVisible(draggable.id);
                        checkVisible();
                        showContent();
                    }else if(draggable.id == "draggable2"){
                        //gsap.to(target, {backgroundColor: 'red'});
                        drag2InBox = true;
                        setVisible(draggable.id);
                        checkVisible();
                        showContent();
                    }else if(draggable.id == "draggable3"){
                        //gsap.to(target, {backgroundColor: 'blue'});
                        drag3InBox = true;
                        setVisible(draggable.id);
                        checkVisible();
                        showContent();
                    }
                } else {
                    gsap.to(target, { backgroundColor: 'lightblue' });
                    setHidden(draggable.id);
                    checkVisible();
                    showContent();
                }
            },
        });
    });
});

var drag1InBox = false;
var drag2InBox = false;
var drag3InBox = false;

function setAllHidden(){
    document.getElementById("html").style.setProperty("visibility", "hidden");
    document.getElementById("css").style.setProperty("visibility", "hidden");
    document.getElementById("js").style.setProperty("visibility", "hidden");
    document.getElementById("htmlMitCss").style.setProperty("visibility", "hidden");
    document.getElementById("cssMitJs").style.setProperty("visibility", "hidden");
    document.getElementById("htmlMitJs").style.setProperty("visibility", "hidden");
    document.getElementById("htmlMitCssUndJs").style.setProperty("visibility", "hidden");
}

function setHidden(idString) {
    if(idString === "draggable1"){
        //console.log("draggable1")
        drag1InBox = false;
    }else if(idString === "draggable2"){
        //console.log("draggable1")
        drag2InBox = false;
    }else if(idString === "draggable3"){
        //console.log("draggable1")
        drag3InBox = false;
    }
}


function setVisible(idString) {
    if(idString === "draggable1"){
        //console.log("draggable1")
        document.getElementById("html").style.setProperty("visibility", "visible");
    }else if(idString === "draggable2"){
        //console.log("draggable1")
        document.getElementById("css").style.setProperty("visibility", "visible");
    }else if(idString === "draggable3"){
        //console.log("draggable1")
        document.getElementById("js").style.setProperty("visibility", "visible");
    }
}

function checkVisible(){
    if(drag1InBox === true
        && drag2InBox === true
        && drag3InBox === true){
        setAllHidden();
        document.getElementById("htmlMitCssUndJs").style.setProperty("visibility", "visible");
    }else if(drag1InBox === true
        && drag2InBox === true){
        setAllHidden();
        document.getElementById("htmlMitCss").style.setProperty("visibility", "visible");
    }else if(drag1InBox === true
        && drag3InBox === true){
        setAllHidden();
        document.getElementById("htmlMitJs").style.setProperty("visibility", "visible");
    }else if(drag3InBox === true
        && drag2InBox === true){
        setAllHidden();
        document.getElementById("cssMitJs").style.setProperty("visibility", "visible");
    }else if(drag1InBox === true){
        setAllHidden();
        document.getElementById("html").style.setProperty("visibility", "visible");
    }else if(drag2InBox === true){
        setAllHidden();
        document.getElementById("css").style.setProperty("visibility", "visible");
    }else if(drag3InBox === true){
        setAllHidden();
        document.getElementById("js").style.setProperty("visibility", "visible");
    }else {
        setAllHidden();
    }

}


var buttonUsage = 0;
function buttonAction(){
    if(buttonUsage == 0){
        document.getElementById("info1").style.setProperty("visibility", "hidden");
        document.getElementById("info2").style.setProperty("visibility", "visible");
        buttonUsage++;
        gsap.from("#info2", {
            duration: 1,
            scale: 0.1,
            opacity: 0,
            ease: 'power1.inOut',
        })
    }else if(buttonUsage == 1){
        document.getElementById("info2").style.setProperty("visibility", "hidden");
        document.getElementById("info3").style.setProperty("visibility", "visible");
        buttonUsage++;
        gsap.from("#info3", {
            duration: 1,
            scale: 0.1,
            opacity: 0,
            ease: 'power1.inOut',
        })
    }else if(buttonUsage == 2){
        gsap.fromTo("#info", 2.5, {}, {x: -3000, ease: 'power1.inOut'});
        setTimeout(function() {
            document.getElementById("info2").style.setProperty("visibility", "hidden");
            document.getElementById("info").style.setProperty("visibility", "hidden");
            document.getElementById("infoButton").style.setProperty("visibility", "hidden");
        }, 3000);
    }
}





let divContent;
let divFrame = "";
window.onload = function (){
    divContent =  document.querySelector("#target");
}

function showContent(){
    if(drag1InBox === true
        && drag2InBox === true
        && drag3InBox === true){
        divFrame = "<iframe class='contentFrame' src='../unterseiten/miniGameWebDesignLogoFiles/index.html' seamless width='100%' height='100%'  name='thmLogo'> </iframe>";
        divContent.innerHTML = divFrame;
        setTimeout(() => {
            alert("Gut gemacht! Du hast deine Credit Points erhalten, jetzt kannst du mit dem Nächsten Thema fortfahren.");
        }, 2300);
    }else if(drag1InBox === true
        && drag2InBox === true){
        divFrame = "<iframe class='contentFrame' src='../unterseiten/miniGameWebDesignLogoFiles/indexOhneJS.html' seamless width='100%' height='100%'  name='thmLogo'> </iframe>";
        divContent.innerHTML = divFrame;
    }else if(drag1InBox === true
        && drag3InBox === true){
        divFrame = "<iframe class='contentFrame' src='../unterseiten/miniGameWebDesignLogoFiles/indexOhneCSS.html' seamless width='100%' height='100%'  name='thmLogo'> </iframe>";
        divContent.innerHTML = divFrame;
    }else if(drag3InBox === true
        && drag2InBox === true){
        divFrame = "<div id='frameRight'> <iframe class='contentFrame' src='../unterseiten/miniGameWebDesignLogoFiles/stylesheet.css' seamless width='100%' height='100%'  name='thmLogo'> </iframe> </div>";
        divFrame += "<div id='frameLeft'> <iframe class='contentFrame' src='../unterseiten/miniGameWebDesignLogoFiles/script.js' seamless width='100%' height='100%'  name='thmLogo'> </iframe> </div>";
        divContent.innerHTML = divFrame;
    }else if(drag1InBox === true){
        divFrame = "<iframe class='contentFrame' src='../unterseiten/miniGameWebDesignLogoFiles/indexOhneCSSundJS.html' seamless width='100%' height='100%'  name='thmLogo'> </iframe>";
        divContent.innerHTML = divFrame;
    }else if(drag2InBox === true){
        divFrame = "<iframe class='contentFrame' src='../unterseiten/miniGameWebDesignLogoFiles/stylesheet.css' seamless width='100%' height='100%'  name='thmLogo'> </iframe>";
        divContent.innerHTML = divFrame;
    }else if(drag3InBox === true){
        divFrame = "<iframe class='contentFrame' src='../unterseiten/miniGameWebDesignLogoFiles/script.js' seamless width='100%' height='100%'  name='thmLogo'> </iframe>";
        divContent.innerHTML = divFrame;
    }else {
        divContent.innerHTML = "";
    }
}


var iframe = document.getElementById("contentFrame");
iframe.width = iframe.contentWindow.document.body.scrollWidth;
iframe.height = iframe.contentWindow.document.body.scrollHeight;