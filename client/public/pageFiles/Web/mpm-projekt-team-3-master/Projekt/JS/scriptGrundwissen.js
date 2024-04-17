document.addEventListener('DOMContentLoaded', function() {

    setTimeout(() => {
        window.scrollTo(0, 0);
        window.scrollTo(0, 0);
    }, 0);

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


    setTimeout(() => {
        alert("Gut gemacht! Du hast deine Credit Points erhalten, jetzt kannst du mit dem Nächsten Thema fortfahren.");
    }, 3000);

});