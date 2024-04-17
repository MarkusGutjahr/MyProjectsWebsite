let finish = 0;
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
        rotate: 270,
        y: '-500%',
        ease: 'power4.inOut',
        stagger: 0.1

    })



    const target1 = document.getElementById('target1');
    const target2 = document.getElementById('target2');
    const target3 = document.getElementById('target3');
    const target4 = document.getElementById('target4');
    const target5 = document.getElementById('target5');
    const target6 = document.getElementById('target6');
    const target7 = document.getElementById('target7');
    const target8 = document.getElementById('target8');
    const target9 = document.getElementById('target9');
    const target10 = document.getElementById('target10');
    const target11 = document.getElementById('target11');
    const target12 = document.getElementById('target12');
    const target13 = document.getElementById('target13');
    const target14 = document.getElementById('target14');
    const target15 = document.getElementById('target15');
    const target16 = document.getElementById('target16');
/*
    const draggabel1 = document.getElementById('draggable1');
    const draggabel2 = document.getElementById('draggable2');
    const draggabel3 = document.getElementById('draggable3');
    const draggabel4 = document.getElementById('draggable4');
    const draggabel5 = document.getElementById('draggable5');
    const draggabel6 = document.getElementById('draggable6');
    const draggabel7 = document.getElementById('draggable7');
    const draggabel8 = document.getElementById('draggable8');
    const draggabel9 = document.getElementById('draggable9');
    const draggabel10 = document.getElementById('draggable10');
    const draggabel11 = document.getElementById('draggable11');
    const draggabel12 = document.getElementById('draggable12');
    const draggabel13 = document.getElementById('draggable13');
    const draggabel14 = document.getElementById('draggable14');
    const draggabel15 = document.getElementById('draggable15');
    const draggabel16 = document.getElementById('draggable16');
 */

    const draggables = document.querySelectorAll('.draggable');


    draggables.forEach((draggable, index) => {
        Draggable.create(draggable, {
            bounds: '#outer-box',
            onDragStart: function() {
                gsap.set(draggable, { zIndex: 2 });
            },
            onDragEnd: function() {

                gsap.set(draggable, { zIndex: 1 });

                if (draggable.id == "draggable1") {
                    if (this.hitTest(target4, '97%')){
                        this.disable();
                        document.getElementById("dt1").style.setProperty("background-color", "rgba(0, 0, 0, 0)");
                        finish++;
                        testFinish();
                    }
                }else if (draggable.id == "draggable2") {
                    if (this.hitTest(target12, '97%')){
                        this.disable();
                        document.getElementById("dt2").style.setProperty("background-color", "rgba(0, 0, 0, 0)");
                        finish++;
                        testFinish();
                    }
                }else if (draggable.id == "draggable3") {
                    if (this.hitTest(target11, '97%')){
                    this.disable();
                        document.getElementById("dt3").style.setProperty("background-color", "rgba(0, 0, 0, 0)");
                        finish++;
                        testFinish();
                }
                }else if (draggable.id == "draggable4") {
                    if (this.hitTest(target13, '97%')){
                    this.disable();
                        document.getElementById("dt4").style.setProperty("background-color", "rgba(0, 0, 0, 0)");
                        finish++;
                        testFinish();
                }
                }else if (draggable.id == "draggable5") {
                    if (this.hitTest(target15, '97%')){
                    this.disable();
                        document.getElementById("dt5").style.setProperty("background-color", "rgba(0, 0, 0, 0)");
                        finish++;
                        testFinish();
                }
                }else if (draggable.id == "draggable6") {
                    if (this.hitTest(target14, '97%')){
                    this.disable();
                        document.getElementById("dt6").style.setProperty("background-color", "rgba(0, 0, 0, 0)");
                        finish++;
                        testFinish();
                }
                }else if (draggable.id == "draggable7") {
                    if (this.hitTest(target1, '97%')){
                    this.disable();
                        document.getElementById("dt7").style.setProperty("background-color", "rgba(0, 0, 0, 0)");
                        finish++;
                        testFinish();
                }
                }else if (draggable.id == "draggable8") {
                    if (this.hitTest(target7, '97%')){
                    this.disable();
                        document.getElementById("dt8").style.setProperty("background-color", "rgba(0, 0, 0, 0)");
                        finish++;
                        testFinish();
                }
                }else if (draggable.id == "draggable9") {
                    if (this.hitTest(target3, '97%')){
                    this.disable();
                        document.getElementById("dt9").style.setProperty("background-color", "rgba(0, 0, 0, 0)");
                        finish++;
                        testFinish();
                }
                }else if (draggable.id == "draggable10") {
                    if (this.hitTest(target9, '97%')){
                    this.disable();
                        document.getElementById("dt10").style.setProperty("background-color", "rgba(0, 0, 0, 0)");
                        finish++;
                        testFinish();
                }
                }else if (draggable.id == "draggable11") {
                    if (this.hitTest(target2, '97%')){
                    this.disable();
                        document.getElementById("dt11").style.setProperty("background-color", "rgba(0, 0, 0, 0)");
                        finish++;
                        testFinish();
                }
                }else if (draggable.id == "draggable12") {
                    if (this.hitTest(target5, '97%')){
                    this.disable();
                        document.getElementById("dt12").style.setProperty("background-color", "rgba(0, 0, 0, 0)");
                        finish++;
                        testFinish();
                }
                }else if (draggable.id == "draggable13") {
                    if (this.hitTest(target16, '97%')){
                    this.disable();
                        document.getElementById("dt13").style.setProperty("background-color", "rgba(0, 0, 0, 0)");
                        finish++;
                        testFinish();
                }
                }else if (draggable.id == "draggable14") {
                    if (this.hitTest(target8, '97%')){
                    this.disable();
                        document.getElementById("dt14").style.setProperty("background-color", "rgba(0, 0, 0, 0)");
                        finish++;
                        testFinish();
                }
                }else if (draggable.id == "draggable15") {
                    if (this.hitTest(target6, '97%')){
                    this.disable();
                        document.getElementById("dt15").style.setProperty("background-color", "rgba(0, 0, 0, 0)");
                        finish++;
                        testFinish();
                }
                }else if (draggable.id == "draggable16") {
                    if (this.hitTest(target10, '97%')){
                    this.disable();
                        document.getElementById("dt16").style.setProperty("background-color", "rgba(0, 0, 0, 0)");
                        finish++;
                        testFinish();
                }
                }

                /*
                if (this.hitTest(target1, '80%')) {
                    gsap.to(target1, {backgroundColor: 'blue'});

                }
                else {
                    gsap.to(target, { backgroundColor: 'lightblue' });
                    falsch();
                }*/
            },
        });
    });
});

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


function testFinish(){
    if(finish === 16){
        alert("Gut gemacht! Du hast deine Credit Points erhalten, jetzt kannst du mit dem Nächsten Thema fortfahren.");
    }
    /*
    else{
        console.log(finish)
    }
    */
}
