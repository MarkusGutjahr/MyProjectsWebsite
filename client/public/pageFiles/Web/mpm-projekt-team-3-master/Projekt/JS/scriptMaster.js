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

                //Web&Mobile
                if (this.hitTest(target1, '80%')) {
                    //richtige
                    if(draggable.id == "draggable1"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        showInfoText(draggable.id);
                        finish1 = 1;
                        richtig();
                    }else if(draggable.id == "draggable2"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        showInfoText(draggable.id);
                        finish2 = 1;
                        richtig();
                    }else if(draggable.id == "draggable11"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        showInfoText(draggable.id);
                        finish11 = 1;
                        richtig();
                    }else if(draggable.id == "draggable12"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        showInfoText(draggable.id);
                        finish12 = 1;
                        richtig();
                    }
                    //falsche
                    else{
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                        hideAllInfoText();
                    }
                }

                //Medienproduktion
                if (this.hitTest(target2, '80%')) {
                    //richtige
                    if(draggable.id == "draggable3"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        showInfoText(draggable.id);
                        finish3 = 1;
                        richtig();
                    }else if(draggable.id == "draggable4"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        showInfoText(draggable.id);
                        finish4 = 1;
                        richtig();
                    }else if(draggable.id == "draggable9"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        showInfoText(draggable.id);
                        finish9 = 1;
                        richtig();
                    }
                    //falsche
                    else{
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                        hideAllInfoText();
                    }

                }

                //Informatik
                if (this.hitTest(target3, '80%')) {
                    //richtige
                    if(draggable.id == "draggable5"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        showInfoText(draggable.id);
                        finish5 = 1;
                        richtig();
                    }else if(draggable.id == "draggable6"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        showInfoText(draggable.id);
                        finish6 = 1;
                        richtig();
                    }
                    //falsche
                    else{
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                        hideAllInfoText();
                    }
                }

                //Sonstige
                if (this.hitTest(target4, '80%')) {
                    //richtige
                    if(draggable.id == "draggable7"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        showInfoText(draggable.id);
                        finish7 = 1;
                        richtig();
                    }else if(draggable.id == "draggable8"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        showInfoText(draggable.id);
                        finish8 = 1;
                        richtig();
                    }else if(draggable.id == "draggable10"){
                        document.getElementById(draggable.id).style.setProperty("background-color", "#80ba24");
                        showInfoText(draggable.id);
                        finish10 = 1;
                        richtig();
                    }
                    //falsche
                    else{
                        document.getElementById(draggable.id).style.setProperty("background-color", "red");
                        falsch();
                        hideAllInfoText();
                    }
                }
            },
        });
    });
});


function richtig(){
    document.getElementById("infoFalsch").style.setProperty("visibility", "hidden");
    document.getElementById("infoRichtig").style.setProperty("visibility", "visible");
    testFinish();
}

function falsch(){
    document.getElementById("infoRichtig").style.setProperty("visibility", "hidden");
    document.getElementById("infoFalsch").style.setProperty("visibility", "visible");
}

function hideAllInfoText(){
    document.getElementById("info1").style.setProperty("visibility", "hidden");
    document.getElementById("info2").style.setProperty("visibility", "hidden");
    document.getElementById("info3").style.setProperty("visibility", "hidden");
    document.getElementById("info4").style.setProperty("visibility", "hidden");
    document.getElementById("info5").style.setProperty("visibility", "hidden");
    document.getElementById("info6").style.setProperty("visibility", "hidden");
    document.getElementById("info7").style.setProperty("visibility", "hidden");
    document.getElementById("info8").style.setProperty("visibility", "hidden");
    document.getElementById("info9").style.setProperty("visibility", "hidden");
}

function showInfoText(id){
    if(id === "draggable1"){
        hideAllInfoText();
        document.getElementById("info1").style.setProperty("visibility", "visible");
    }else if(id === "draggable2"){
        hideAllInfoText();
        document.getElementById("info1").style.setProperty("visibility", "visible");
    }else if(id === "draggable3"){
        hideAllInfoText();
        document.getElementById("info2").style.setProperty("visibility", "visible");
    }else if(id === "draggable4"){
        hideAllInfoText();
        document.getElementById("info3").style.setProperty("visibility", "visible");
    }else if(id === "draggable5"){
        hideAllInfoText();
        document.getElementById("info4").style.setProperty("visibility", "visible");
    }else if(id === "draggable6"){
        hideAllInfoText();
        document.getElementById("info4").style.setProperty("visibility", "visible");
    }else if(id === "draggable7"){
        hideAllInfoText();
        document.getElementById("info5").style.setProperty("visibility", "visible");
    }else if(id === "draggable8"){
        hideAllInfoText();
        document.getElementById("info6").style.setProperty("visibility", "visible");
    }else if(id === "draggable9"){
        hideAllInfoText();
        document.getElementById("info7").style.setProperty("visibility", "visible");
    }else if(id === "draggable10"){
        hideAllInfoText();
        document.getElementById("info8").style.setProperty("visibility", "visible");
    }else if(id === "draggable11"){
        hideAllInfoText();
        document.getElementById("info9").style.setProperty("visibility", "visible");
    }else if(id === "draggable12"){
        hideAllInfoText();
        document.getElementById("info9").style.setProperty("visibility", "visible");
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
let finish10;
let finish11;
let finish12;

function testFinish(){
    if(finish1 === 1 &&
        finish2 === 1 &&
        finish3 === 1 &&
        finish4 === 1 &&
        finish5 === 1 &&
        finish6 === 1 &&
        finish7 === 1 &&
        finish8 === 1 &&
        finish9 === 1 &&
        finish10 === 1 &&
        finish11 === 1 &&
        finish12 === 1){
        alert("Gut gemacht! Du hast deine Credit Points erhalten, jetzt kannst du mit dem Nächsten Thema fortfahren.");
    }
}