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

    gsap.from(".target", {
        duration: 1,
        scale: 0.1,
        opacity: 0,
        ease: 'power1.inOut',
    })


    const target1 = document.getElementById('target1');
    const target2 = document.getElementById('target2');
    const target3 = document.getElementById('target3');
    const target4 = document.getElementById('target4');
    const draggables = document.querySelectorAll('.draggable');


    draggables.forEach((draggable, index) => {
        Draggable.create(draggable, {
            bounds: '#outer-box',
            onDragStart: function() {
                gsap.set(draggable, { zIndex: 1 });
            },
            onDragEnd: function() {
                gsap.set(draggable, { zIndex: 0 });

                //ton-technik
                if (this.hitTest(target1, '80%')) {
                    //richtige
                    if(draggable.id == "draggable2"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        finish2 = 1;
                        richtig();
                    }else if(draggable.id == "draggable4"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        finish4 = 1;
                        richtig();
                    }else if(draggable.id == "draggable9"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        finish9  = 1;
                        richtig();
                    }
                    //falsche
                    else if(draggable.id == "draggable1"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                    }else if(draggable.id == "draggable3"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                    }else if(draggable.id == "draggable5"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                    }else if(draggable.id == "draggable6"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                    }else if(draggable.id == "draggable7"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                    }else if(draggable.id == "draggable8"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                    }
                }

                //film-technik
                if (this.hitTest(target2, '80%')) {
                    //richtige
                    if(draggable.id == "draggable1"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        finish1 = 1;
                        richtig();
                    }else if(draggable.id == "draggable3"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        finish3 = 1;
                        richtig();
                    }else if(draggable.id == "draggable5"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        finish5 = 1;
                        richtig();
                    }else if(draggable.id == "draggable6"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        finish6 = 1;
                        richtigDoppelt();
                    }else if(draggable.id == "draggable7"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        finish7 = 1;
                        richtigDoppelt();
                    }else if(draggable.id == "draggable8"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        finish8 = 1;
                        richtig();
                    }
                    //falsche
                    else if(draggable.id == "draggable2"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                    }else if(draggable.id == "draggable4"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                    }else if(draggable.id == "draggable9"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                    }

                }

                //mediendesign
                if (this.hitTest(target3, '80%')) {
                    //richtige
                    if(draggable.id == "draggable6"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        finish6 = 1;
                        richtigDoppelt();
                    }else if(draggable.id == "draggable7"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        finish7 = 1;
                        richtigDoppelt();
                    }
                    //falsche
                    else if(draggable.id == "draggable1"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                    }else if(draggable.id == "draggable2"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                    }else if(draggable.id == "draggable3"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                    }else if(draggable.id == "draggable4"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                    }else if(draggable.id == "draggable5"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                    }else if(draggable.id == "draggable8"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                    }else if(draggable.id == "draggable9"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                    }
                }

                /*
                else {
                    gsap.to(target, { backgroundColor: 'lightblue' });
                    falsch();
                }

                 */
            },
        });
    });
});

function setAllHidden(){
    document.getElementById("richtig").style.setProperty("visibility", "hidden");
    document.getElementById("falsch").style.setProperty("visibility", "hidden");
    document.getElementById("richtigDoppelt").style.setProperty("visibility", "hidden");
}

function richtig(){
    setAllHidden();
    document.getElementById("richtig").style.setProperty("visibility", "visible");
    testFinish();
}

function falsch(){
    setAllHidden();
    document.getElementById("falsch").style.setProperty("visibility", "visible");
}

function richtigDoppelt(){
    setAllHidden();
    document.getElementById("richtigDoppelt").style.setProperty("visibility", "visible");
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
        gsap.fromTo("#info", 2.5, {}, {x: -3000, ease: 'power1.inOut'});
        setTimeout(function() {
            document.getElementById("info2").style.setProperty("visibility", "hidden");
            document.getElementById("info").style.setProperty("visibility", "hidden");
            document.getElementById("infoButton").style.setProperty("visibility", "hidden");
        }, 3000);
    }
}

let finish1;
let finish2;
let finish3;
let finish4;
let finish5;
let finish6;
let finish7;
let finish8;
let finish9;


function testFinish(){
    if(finish1 === 1 &&
        finish2 === 1 &&
        finish3 === 1 &&
        finish4 === 1 &&
        finish5 === 1 &&
        finish6 === 1 &&
        finish7 === 1 &&
        finish8 === 1 &&
        finish9 === 1){
        alert("Gut gemacht! Du hast deine Credit Points erhalten, jetzt kannst du mit dem Nächsten Thema fortfahren.");
    }
}