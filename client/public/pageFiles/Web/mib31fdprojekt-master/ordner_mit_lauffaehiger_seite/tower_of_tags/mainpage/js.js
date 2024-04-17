// Funktion, die die Animationen basierend auf dem Scroll-Event auslöst
function animateOnScroll() {
    var elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    elementsToAnimate.forEach(function (element) {
        var elementPosition = element.getBoundingClientRect().top;
        var windowHeight = window.innerHeight;

        // Wenn das Element fast im sichtbaren Bereich ist, füge die CSS-Klasse hinzu
        if (elementPosition < windowHeight * 0.8) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
        }
    });
}

// Füge den Scroll-Event-Listener hinzu
window.addEventListener('scroll', animateOnScroll);

// Führe die Animationen beim Laden der Seite aus
document.addEventListener('DOMContentLoaded', function () {
    animateOnScroll();
});

// Funktion zum Scrollen
function scrollValue() {

    var navbar = document.getElementById('mainnav');
    var scroll = window.scrollY;
    if (scroll < 200) {
        navbar.style.backgroundColor = "transparent";

    } else {

        navbar.style.backgroundColor = "#F2622E";
    }
}

window.addEventListener('scroll', scrollValue);


//open gamepage based on the level
function startGameWithLevel(level) {
    // Redirect to the game page with the specified level
    window.location.href = `../gamepage/gamepage.html`;
}