gsap.registerPlugin(Flip);
let doorStart = document.querySelector('#doorStartR').addEventListener("click", (e) => {
    // let state1 = gsap.to(('#door'), {duration: 2, rotationY:"-=90", repeat:-1, ease: "none"});
    gsap.timeline.add(getTLDoorStart());
   
})

function getTLDoorStart() {
    var tlDoorStart = new gsap.timeline({
            yoyo: true,
            repeat: 0
        })
        .fromTo("#character", 2.5, {}, {
            left: '23%'
        })
        .add("startTL")
        .fromTo("#doorStartL", 2.5, {
            x: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0
        }, {
            rotationY: 85,
            skewX: 0,
            skewY: 0,
            transformOrigin: "0",
            ease: Sine.easeInOut
        }, "startTL")
        .fromTo("#doorStartR", 2.5, {
            x: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0
        }, {
            rotationY: -85,
            skewX: 0,
            skewY: 0,
            transformOrigin: "100%",
            ease: Sine.easeInOut
        }, "startTL")
     
   setTimeout(function() {
  // Code, der erst nach 2 Sekunden ausgeführt wird
 window.location.assign("C:Users/marku/OneDrive/Desktop/MIB18 MPM WuM/mpm-projekt-team-3/Projekt/unterseiten/raum.html");
}, 5250); 
    return tlDoorStart;
}

let doorOptions = document.querySelector('#doorOptionsR').addEventListener("click", (e) => {
    // let state1 = gsap.to(('#door'), {duration: 2, rotationY:"-=90", repeat:-1, ease: "none"});
    gsap.timeline.add(getTLDoorOptions());
})

function getTLDoorOptions() {
    var tlDoorOptions = new gsap.timeline({
            yoyo: true,
            repeat: 0
        })
        .fromTo("#character", 2.5, {}, {
            left: '15%'
        })
        .add("startTL")
        .fromTo("#doorOptionsL", 2.5, {
            x: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0
        }, {
            rotationY: 85,
            skewX: 0,
            skewY: 0,
            transformOrigin: "0",
            ease: Sine.easeInOut
        }, "startTL")
        .fromTo("#doorOptionsR", 2.5, {
            x: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0
        }, {
            rotationY: -85,
            skewX: 0,
            skewY: 0,
            transformOrigin: "100%",
            ease: Sine.easeInOut
        }, "startTL")

    return tlDoorOptions;
}
let doorMaster = document.querySelector('#doorMasterR').addEventListener("click", (e) => {
    // let state1 = gsap.to(('#door'), {duration: 2, rotationY:"-=90", repeat:-1, ease: "none"});
    gsap.timeline.add(getTLDoorMaster());

})

function getTLDoorMaster() {
    var tlDoorMaster = new gsap.timeline({
        yoyo: true,
        repeat: 0
    })
        .fromTo("#character", 2.5, {}, {
            left: '34%'
        })
        .add("startTL")
        .fromTo("#doorMasterL", 2.5, {
            x: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0
        }, {
            rotationY: 85,
            skewX: 0,
            skewY: 0,
            transformOrigin: "0",
            ease: Sine.easeInOut
        }, "startTL")
        .fromTo("#doorMasterR", 2.5, {
            x: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0
        }, {
            rotationY: -85,
            skewX: 0,
            skewY: 0,
            transformOrigin: "100%",
            ease: Sine.easeInOut
        }, "startTL")

    setTimeout(function() {
        // Code, der erst nach 2 Sekunden ausgeführt wird
        window.location.assign("C:Users/marku/OneDrive/Desktop/MIB18 MPM WuM/mpm-projekt-team-3/Projekt/unterseiten/indexMaster.html");
    }, 5250);
    return tlDoorMaster;
}
//Quelle: https://codepen.io/jonathan/pen/YyMKMz (nätürlich auf unser Projekt angepasst/abgeändert)
// wait until DOM is ready
document.addEventListener("DOMContentLoaded", function (event) {

    function clouds() {

        var tlClouds = new gsap.timeline({
            repeat: -1
        });

        tlClouds.to("#wolkenhintergrund", 52, {
            backgroundPosition: "-2222px bottom",
            force3D: true,
            rotation: 0.01,
            z: 0.01,
            //autoRound:false,
            ease: Linear.easeNone
        });

        return tlClouds;
    }


    function singleCloud() {
        var tlSingleCloud = new gsap.timeline({
            repeat: -1
        });

        cloudUpDown(5);
        tlSingleCloud.to("#wolke", 5, {
            x: -5
        });
        cloudUpDown(5);
        tlSingleCloud.to("#wolke", 5, {
            x: 5
        });
        cloudUpDown(5);
        tlSingleCloud.to("#wolke", 5, {
            x: 5
        });
        cloudUpDown(5);
        tlSingleCloud.to("#wolke", 5, {
            x: -5
        });

        return tlSingleClouds;


        function cloudUpDown(speed) {
            tlSingleCloud.to("#wolke", speed, {
                y: -5
            });
            tlSingleCloud.to("#wolke", speed, {
                y: 5
            });
            tlSingleCloud.to("#wolke", speed, {
                y: -5
            });
            tlSingleCloud.to("#wolke", speed, {
                y: 5
            });
        }
    }




    var masterTL = new gsap.timeline({
        repeat: -1
    });

    // window load event makes sure image is
    // loaded before running animation
    window.onload = function () {

        masterTL
            .add(clouds(), 0)
            .add(singleCloud(), 0)
            .timeScale(0.7)
            .progress(1).progress(0)
            .play();
    };

});


 /*
var tlText = new TimelineMax({
   // repeat: -1
});




let p = document.querySelector("#starttext");
let text = p.textContent.split("");
let result = "";




text.forEach(function(char){
    if(char == "$"){
        result += (char.trim() === "") ? "" : "<span class='text'>" + " " + "</span>";
    }else if(char == "&"){
        result += (char.trim() === "") ? "" : "<br>";
    }else {
        result += (char.trim() === "") ? "" : "<span class='text'>" + char + "</span>";
       // result += (char.trim() === "") ? "" : "<span class='text'>" + char + "</span>" + "<img src=\"IMG/pencilNochSelberMachen.jpg\" class=\"pencil\" height=\"21\" width=\"20\"/>\n";
    }
    });


p.innerHTML = result;

console.log(p.outerHTML);


tlText.from(".text", 0.1, {
    opacity: 0,
    y: 100,
    ease: "Expo.Out",
    stagger: {
        amount: 10
    }
})

function showPencil(){
    let pencil = gsap.to('.pencil', {opacity: 0, ease:"power2.inOut", repeat: -1})
}

*/
// set up text to print, each item in array is new line


var aText = new Array(
    "Lernen und Spielen in einem?",
    "So sieht Medieninformatik mit",
    "unserem interaktiven Spiel aus!",
    "Werde zum Experten in einem unterhaltsamen Abenteuer"
);
var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

function typewriter()
{
    sContents =  ' ';
    iRow = Math.max(0, iIndex-iScrollAt);
    var destination = document.getElementById("starttext");

    while ( iRow < iIndex ) {
        sContents += aText[iRow++] + '<br />';
    }
    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "<img src=\"IMG/kreide_1.svg\" class=\"pencil\" height=\"21\" width=\"20\"/>";
    if ( iTextPos++ == iArrLength ) {
        iTextPos = 0;
        iIndex++;
        if ( iIndex != aText.length ) {
            iArrLength = aText[iIndex].length;
            setTimeout("typewriter()", 500);
        }
    } else {
        setTimeout("typewriter()", iSpeed);
    }
}


typewriter();