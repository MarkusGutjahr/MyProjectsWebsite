gsap.registerPlugin(Flip);
let door = document.querySelector('#door');

document.addEventListener("click", (e) => {
        // let state1 = gsap.to(('#door'), {duration: 2, rotationY:"-=90", repeat:-1, ease: "none"});
        TimelineMax.add(getTL1());
    }
)
function getTL1() {
    var tl = new TimelineMax({yoyo:true, repeat:0})
        .add("startTL")
        .fromTo("#door", 2.5, {x:0, rotationX:0, rotationY:0, skewX:0, skewY:0}, {rotationY:85, skewX:0, skewY:0, transformOrigin:"0", ease: Sine.easeInOut}, "startTL")
    return tl;
}