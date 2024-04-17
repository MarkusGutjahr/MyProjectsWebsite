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
                        gsap.to(target, {backgroundColor: 'lightblue'});
                        drag1InBox = true;
                        setVisible(draggable.id);
                        checkVisible();
                    }else if(draggable.id == "draggable2"){
                        gsap.to(target, {backgroundColor: 'lightblue'});
                        drag2InBox = true;
                        setVisible(draggable.id);
                        checkVisible();
                    }else if(draggable.id == "draggable3"){
                        gsap.to(target, {backgroundColor: 'lightblue'});
                        drag3InBox = true;
                        setVisible(draggable.id);
                        checkVisible();
                    }
                } else {
                    gsap.to(target, { backgroundColor: 'lightblue' });
                    setHidden(draggable.id);
                    checkVisible();
                }
            },
        });
    });
});

var drag1InBox = false;
var drag2InBox = false;
var drag3InBox = false;

function setAllHidden(){
    document.getElementById("modell").style.setProperty("visibility", "hidden");
    document.getElementById("textur").style.setProperty("visibility", "hidden");
    document.getElementById("animation").style.setProperty("visibility", "hidden");
    document.getElementById("modellMitTextur").style.setProperty("visibility", "hidden");
    document.getElementById("animationMitTextur").style.setProperty("visibility", "hidden");
    document.getElementById("animationMitModell").style.setProperty("visibility", "hidden");
    document.getElementById("animationMitModellUndTextur").style.setProperty("visibility", "hidden");
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
        document.getElementById("modell").style.setProperty("visibility", "visible");
    }else if(idString === "draggable2"){
        //console.log("draggable1")
        document.getElementById("textur").style.setProperty("visibility", "visible");
    }else if(idString === "draggable3"){
        //console.log("draggable1")
        document.getElementById("animation").style.setProperty("visibility", "visible");
    }
}



let divContent;
let divFrame = "";
window.onload = function (){
    divContent =  document.querySelector("#target");
}

function checkVisible(){
    if(drag1InBox === true
        && drag2InBox === true
        && drag3InBox === true){
        setAllHidden();
        document.getElementById("animationMitModellUndTextur").style.setProperty("visibility", "visible");
        //divFrame = "<iframe class='contentFrame' src='miniGame3DExtraFiles/Ente_Animation_linear.mp4' type='video/mp4' seamless width='100%' height='100%'  name='MSA'> </iframe>";
        divFrame = "<video class='contentFrame' width='100%' height='100%' autoplay loop> <source src='miniGame3DExtraFiles/Ente_Animation_linear.mp4' type='video/mp4'> </video>"
        divContent.innerHTML = divFrame;
        setTimeout(() => {
            alert("Gut gemacht! Du hast deine Credit Points erhalten, jetzt kannst du mit dem Nächsten Thema fortfahren.");
        }, 3000);
    }else if(drag1InBox === true
        && drag2InBox === true){
        setAllHidden();
        document.getElementById("modellMitTextur").style.setProperty("visibility", "visible");
        divFrame = "<img class='contentFrame' src='miniGame3DExtraFiles/Textur_Ente.png' type='image' seamless width='100%' height='100%'>";
        divContent.innerHTML = divFrame;
    }else if(drag1InBox === true
        && drag3InBox === true){
        setAllHidden();
        document.getElementById("animationMitModell").style.setProperty("visibility", "visible");
        //divFrame = "<iframe class='contentFrame' src='miniGame3DExtraFiles/Ente_Animation_linear_lambert.mp4' type='video/mp4' seamless width='100%' height='100%'  name='MA'> ";
        divFrame = "<video class='contentFrame' width='100%' height='100%' autoplay loop> <source src='miniGame3DExtraFiles/Ente_Animation_linear_lambert.mp4' type='video/mp4'> </video>"
        divContent.innerHTML = divFrame;
    }else if(drag3InBox === true
        && drag2InBox === true){
        setAllHidden();
        document.getElementById("animationMitTextur").style.setProperty("visibility", "visible");
        divFrame = "<div class='divFlex'> <img class='imgFlex' class='contentFrame' src='miniGame3DExtraFiles/Animation1.png' type='image' seamless width='50%' height='100%'> " +
            "<img class='imgFlex' class='contentFrame' src='miniGame3DExtraFiles/Shading1.png' type='image' seamless width='50%' height='100%'> " +
            "<img class='imgFlex' class='contentFrame' src='miniGame3DExtraFiles/Shading2.png' type='image' seamless width='50%' height='100%'> </div>";
        //divFrame += "<div class='floatRight'> <img class='contentFrame' src='miniGame3DExtraFiles/Animation2.png' type='image' seamless width='50%' height='100%'> </div>";
        divContent.innerHTML = divFrame;
    }else if(drag1InBox === true){
        setAllHidden();
        document.getElementById("modell").style.setProperty("visibility", "visible");
        divFrame = "<img class='contentFrame' src='miniGame3DExtraFiles/Ente_Wireframe.jpg' type='image' seamless width='100%' height='100%'  name='M'>";
        divContent.innerHTML = divFrame;
    }else if(drag2InBox === true){
        setAllHidden();
        document.getElementById("textur").style.setProperty("visibility", "visible");
        divFrame = "<div class='floatLeft'> <img class='contentFrame' src='miniGame3DExtraFiles/Shading1.png' type='image' seamless width='100%' height='100%'></div>";
        divFrame += "<div class='floatRight'> <img class='contentFrame' src='miniGame3DExtraFiles/Shading2.png' type='image' seamless width='100%' height='100%'> </div>";
        divContent.innerHTML = divFrame;
    }else if(drag3InBox === true){
        setAllHidden();
        document.getElementById("animation").style.setProperty("visibility", "visible");
        divFrame = "<div class='floatLeft'> <img class='contentFrame' src='miniGame3DExtraFiles/Animation1.png' type='image' seamless width='100%' height='100%'> </div>";
        //divFrame += "<div class='floatRight'> <img class='contentFrame' src='miniGame3DExtraFiles/Animation2.png' type='image' seamless width='100%' height='100%'> </div>";
        divContent.innerHTML = divFrame;
    }else {
        setAllHidden();
        divContent.innerHTML = "";
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
            document.getElementById("info").style.setProperty("visibility", "hidden");
            document.getElementById("info3").style.setProperty("visibility", "hidden");
            document.getElementById("infoButton").style.setProperty("visibility", "hidden");
        }, 3000);
    }
}