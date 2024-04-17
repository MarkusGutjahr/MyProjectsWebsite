var hamster = getRandomInt(64,71);
var coin = getRandomInt(1,8);
var obstacle = [getRandomInt(10,17),getRandomInt(19,26),getRandomInt(28,35),getRandomInt(37,44),getRandomInt(46,53),getRandomInt(55,62)];
fieldCreator();
var hamsterField = document.getElementById(hamster);
var coinField = document.getElementById(coin);
var arrow = document.getElementById("arrow")
var direction = 1;
var processBoxes = [];
var arrAblauf = [];
var target = document.getElementById("target");
var directionDemo = 1;
var x=0;
var media = window.matchMedia("(orientation: portrait)");
media.addListener(myFunction);

for(var i=0; i<obstacle.length; i++){
    document.getElementById(obstacle[i]).innerHTML = "<img  class='multCoins' src='../../../IMG/icons8-münze-48.png' style='width: 80%; margin: 9% 0% 0% 9%;' >";
}
coinField.innerHTML = "<img id='duck' src='../../../IMG/duck.png' style='width: 80%; margin-left: 9%;' >";
hamsterField.innerHTML = "<img id='coin' src='../../../IMG/robotics.png' style='width: 80%; margin-left: 9%'>";



document.addEventListener('DOMContentLoaded', function() {

    setTimeout(() => {
        window.scrollTo(0, 0);
        window.scrollTo(0, 0);
    }, 0);

    gsap.from(".draggable, .testAnimation, .Button, .multCoins", {
        duration: 1,
        scale: 0.1,
        opacity: 0,
        rotate: 270,
        y: '-500%',
        ease: 'power4.inOut',
        stagger: 0.1
    })

    gsap.from("#coin, #duck", {
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

    gsap.fromTo("#arrow", 1, { scaleY: -1 , autoAlpha:0, ease: Linear.easeNone }, {scaleY:1, autoAlpha:1});

    gsap.from(".black, .white", {
        duration: 1,
        scale: 0.1,
        opacity: 0,
        rotate: 270,
        y: '-500%',
        ease: 'power4.inOut',
        stagger: 0.02
    })
});











function move(){

    //delete old position
    hamsterField.innerHTML = "";

    //now we move
    try {
        hamster+=direction;
        hamsterField = document.getElementById(hamster);
        hamsterField.innerHTML = "<img src='../../../IMG/robotics.png' id='coin' style='width: 80%; margin-left: 9%'>";
/*
        for(var i=0; i<obstacle.length; i++){
        if (hamster == obstacle[i]){
            console.log("HIT!");
            document.getElementById(obstacle[i]).innerHTML = "<img src='../../../IMG/stone.svg' style='z-index: 0; width: 80%; margin-left: 9%;' >";
            hamsterField.innerHTML = "<img src='../../../IMG/robotics.png' id='coin' style='width: 80%; margin-left: 9%'>";
        }
        }
*/
    }
    catch(err) {
        document.getElementById("field").innerHTML = err.message;
        alert("GameOver");
        location.reload();
    }

    getCoin();
    win();
}

function getCoin(){

    for(var i=0; i<obstacle.length; i++){
        if(hamsterField.id == document.getElementById(obstacle[i]).id){
            console.log(obstacle.length-1 +" Stück fehlen noch");//vorher
            obstacle.remove(document.getElementById(obstacle[i]).id);
            //console.log(obstacle.length+" nachher");
        }
    }
}

Array.prototype.remove = function(value) {
    this.splice(this.indexOf(value), 1);
}


function turnRight(){

    switch (direction){
        case 1:
            direction += 8;
            arrow.style.transform = 'rotate(90deg)';
            //console.log("Hamster geht nach unten");
            break;
        case 9:
            direction -= 10;
            arrow.style.transform = 'rotate(180deg)';
            //console.log("Hamster geht nach links");
            break;
        case -1:
            direction -= 8;
            arrow.style.transform = 'rotate(270deg)';
            //console.log("Hamster geht nach oben");
            break;
        case -9:
            direction += 10;
            arrow.style.transform = 'rotate(360deg)';
            //console.log("Hamster geht nach rechts");
            break;
        default:
            break;
    }

}

function turnRightDemo(){
    switch (directionDemo){
        case 1:
            arrow.style.transform = 'rotate(90deg)';
            directionDemo++;
            break;
        case 2:
            arrow.style.transform = 'rotate(180deg)';
            directionDemo++;
            break;
        case 3:
            arrow.style.transform = 'rotate(270deg)';
            directionDemo++;
            break;
        case 4:
            arrow.style.transform = 'rotate(360deg)';
            directionDemo-=3;
            break;
        default:
            break;
    }
}

function fieldCreator(){
    var feld = document.getElementById('field');
    for (var i=0; i<72; i++){

        var divElement = document.createElement("div");

        if(i%9!=0){

            if(i%2 == 0){

                feld.innerHTML += "<div class='black target' id='"+i+"'></div>";
            }
            else{
                feld.innerHTML += "<div class='white target' id='"+i+"'></div>";

            }
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function win(){

    if(coin == hamster && obstacle.length == 0){
        alert("Creditpoints erhalten");
        location.reload();
    }
    else if(coin == hamster){
        alert("Es müssen erst alle Münzen eingesammelt werden!");
        location.reload();
    }
}


var droppables = $(".draggable");
var dropArea = $("#dragBox");
Draggable.create(droppables, {
    throwProps:true,
    bounds: window,
    onPress: function() { this.startX = this.x; this.startY = this.y; },
    onDrag:Check ,
    onThrowUpdate:Check ,
    onDragEnd:Back ,
    onThrowComplete:Back
});

function Check(){
    if (this.hitTest(dropArea, "99%")) {
        $(this.target).addClass("highlight");
    } else {
        $(this.target).removeClass("highlight");
    }
};

function Back(e){
    if (this.hitTest(target, '80%')) {
        var boxAussen = e.target.innerHTML;
    if(e.target.innerHTML == "Move" || boxAussen.includes("Move")){
        //var pushed = "<p class='process move'>"+e.target.innerHTML+"</p>";
        var pushed = "<p class='process move'>"+"Move"+"</p>";
        arrAblauf.push("Move");
        //arrAblauf.push(e.target.innerHTML);
        processBoxes.push(pushed);
        target.innerHTML = processBoxes.join('');
    }
    else{
        //var pushed = "<p class='process'>"+e.target.innerHTML+"</p>";
        var pushed = "<p class='process'>"+"Turn Right"+"</p>";
        //arrAblauf.push(e.target.innerHTML);
        arrAblauf.push("Turn Right");
        processBoxes.push(pushed);
        target.innerHTML = processBoxes.join('');
        turnRightDemo();

    }
    //console.log(arrAblauf);
    //console.log(processBoxes);
    myFunction(x);


    if (!$(this.target).hasClass("highlight")) {
        TweenLite.to(this.target, 0.2, {x: this.startX,y:this.startY})
    }
    }
    else{

        TweenLite.to(this.target, 0.2, {x: this.startX,y:this.startY})


    }
};

function go(){


    //console.log("go");
    //console.log(arrAblauf);
    //console.log(processBoxes);
        setTimeout(function (){

            if(arrAblauf[x] === "Move"){
                move();

            }

            else  if(arrAblauf[x] === "Turn Right"){
                turnRight();

            }
            x++;
            if(x<arrAblauf.length){
                go();

            }
            else{
                reset();
            }

        },500);


}

function reset(){

target.innerHTML="";
arrAblauf = [];
processBoxes = [];
x=0;
arrow.style.transform = 'rotate(0deg)';
direction = 1;
directionDemo = 1;

//console.log("reset");
//console.log(arrAblauf);
//console.log(processBoxes);

}


function myFunction(x) {
    if (x.matches) { // If media query matches
        if(arrAblauf.length == 10){
            go();
        }
        //document.body.style.backgroundColor = "yellow";
    } else {
        if(arrAblauf.length == 18){
            go();
        }

    }
}








