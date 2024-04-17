var schwerpunktwahl;
//Hässlich aber sonst bekomme ich im Aufruf ein Problem mit den '
var webandmobile = "Web & Mobile";
var medienproduktion = "Medienproduktion";

//Um die Quests aktualisieren zu können
var aktuelleQuest="Laufe zur THM!";
var alleRauemeDurchlaufen= [];
/* Hintergrund auslesen via XML hat nicht funktioniert also machen wirs wieder via background image */
/*var svgHintergruende = new Array(100);
function xmlAuslesen (){
fetch('../XML/Datenstruktur.xml')
                .then(response => response.text())
                .then(xml_data_raw => {
                    var parser = new DOMParser();
                    var xmlDocument = parser.parseFromString(xml_data_raw, "application/xml");
                     var bildTags = xmlDocument.getElementsByTagName("bild");


    for (var i = 0; i < bildTags.length; i++) {
        svgHintergruende[i] = bildTags[i].innerHTML;
        console.log("Array Stelle:"+i+" Inhalt: "+svgHintergruende[i])
      }
})}*/
function setSchwerpunkt(schwerpunkt){
schwerpunktwahl=schwerpunkt;
alert("Gratulation! Du hast dich entschieden den Schwerpunkt " +schwerpunktwahl+" zu erkunden!");
console.log(schwerpunktwahl);

//Freigeschaltete Wege hinzufügen
floor_unten.pfeilrechts = "createRoom(floor_aufzug)";
floor_unten.pfeillinks = "createRoom(room_eingangshalle)";
room_eingangshalle.pfeilrechts="createRoom(room_grundlagen)";
room_eingangshalle.pfeilmitte="createRoom(room_managment)";

if (schwerpunktwahl=="Web & Mobile"){
console.log("Raum für WebandMobile angepasst!");
floor_aufzug.pfeilmitte = "createRoom(floor_webandmobile)";
floor_aufzug.backgroundimage = "url(../IMG/Aufzug_web_und_mobile.svg)";
document.getElementById("roboter").style.visibility="visible";
document.getElementById("roboter").style.position="fixed";
document.getElementById("roboter").style.left="10px";
document.getElementById("roboter").style.bottom="10px";
//document.getElementById("gefaehrtecontainer").style.visibility="hidden";
}

else {
floor_aufzug.pfeilmitte = "createRoom(floor_medienproduktion)";
document.getElementById("ente").style.visibility="visible";
document.getElementById("ente").style.position="fixed";
document.getElementById("ente").style.left="10px";
document.getElementById("ente").style.bottom="10px";
//document.getElementById("gefaehrtecontainer").style.visibility="hidden";
}
}


function createRoom(roomobject) {
 console.log("Raum wird generiert..." + roomobject);
console.log("Schwerpunkt: "+schwerpunktwahl);

 const elem = document.getElementById("tafeltext");
if (roomobject.tafeltext != undefined){
    elem.style.visibility = "visible";
    elem.innerHTML = roomobject.tafeltext;

}

else {
elem.innerHTML="";
}

if (roomobject.name=="ente"){
document.getElementById("ente").style.visibility="visible";
document.getElementById("roboter").style.visibility="hidden";
}

else if (roomobject.name=="roboter"){
document.getElementById("roboter").style.visibility="visible";
document.getElementById("ente").style.visibility="hidden";
}

else if (roomobject.name=="einfuehrungsveranstaltung"){
document.getElementById("roboter").style.visibility="visible";
document.getElementById("ente").style.visibility="visible";
}

if (schwerpunktwahl!=undefined){
if(roomobject.name == "webdesign" || roomobject.name =="software" || roomobject.name =="grundlagen" || roomobject.name =="managment"){
alleRauemeDurchlaufen.push(true);
console.log("Questfortschritt besuchter Räume: "+alleRauemeDurchlaufen.length);}
}


    changeBackground(roomobject.backgroundimage);
    setNavigation(roomobject);
    updateQuests(roomobject);
}



function changeBackground(image) {
    console.log("Funktion: changeBackground");
    const elem = document.getElementById("raum");
    elem.style.backgroundImage= image;

}

function setNavigation(roomobject) {
    console.log(roomobject);

    if (roomobject.endraum == "true"){document.getElementById("pfeilmitte").style.transform = "rotate(180deg)";
    }
    else {document.getElementById("pfeilmitte").style.transform = "rotate(0deg)";}

document.getElementById("pfeillinks").setAttribute("onclick", roomobject.pfeillinks);
               document.getElementById("pfeillinks").style.visibility="visible";
                document.getElementById("pfeilmitte").setAttribute("onclick", roomobject.pfeilmitte);
                document.getElementById("pfeilmitte").style.visibility="visible";
                document.getElementById("pfeilrechts").setAttribute("onclick", roomobject.pfeilrechts);
                document.getElementById("pfeilrechts").style.visibility="visible";

    if (roomobject.pfeillinks == undefined){
    document.getElementById("pfeillinks").style.visibility="hidden";
    }

    if (roomobject.pfeilrechts == undefined){
        document.getElementById("pfeilrechts").style.visibility="hidden";
        }

    if (roomobject.pfeilmitte == undefined){
            document.getElementById("pfeilmitte").style.visibility="hidden";
            }



}

function updateQuests (roomobject){
console.log("Quests werden geupdatet! Aktuelle Quest: "+aktuelleQuest);
if (aktuelleQuest=="Laufe zur THM!" && roomobject.name=="thm"){
console.log("Fall1");
aktuelleQuest="Besuche die Einführungsveranstaltung!";
}

else if (aktuelleQuest=="Besuche die Einführungsveranstaltung!" && roomobject.name== "einfuehrungsveranstaltung"){
aktuelleQuest="Wähle den Schwerpunkt den du erkunden möchtest!";
document.getElementById("gefaehrtecontainer").style.visibility="visible";
}

else if (aktuelleQuest=="Wähle den Schwerpunkt den du erkunden möchtest!" && schwerpunktwahl!=undefined){
aktuelleQuest="Erkunde dich über die Bereiche deines Schwerpunktes!";
}

else if (aktuelleQuest=="Erkunde dich über die Bereiche deines Schwerpunktes!" && alleRauemeDurchlaufen.length==4){
aktuelleQuest="Erkunde den jeweils anderen Schwerpunkt!";
alleRauemeDurchlaufen= [];
}

else if (aktuelleQuest=="Erkunde den jeweils anderen Schwerpunkt!" && alleRauemeDurchlaufen.length==4){
aktuelleQuest="Gehe zurück zum Einführungsraum!"
}

else {
console.log("Keine Quest musste geupdatet werden!");
return}
document.getElementById("questliste").innerHTML="<li>"+aktuelleQuest+"</li>";
alert("Gut gemacht! Keine Müdigkeit vortäuschen! Deine nächste Aufgabe lautet: "+aktuelleQuest);
}

function showModullist (roomobject){
 const elem = document.getElementById("tafeltext");
  elem.style.visibility = "visible";
  elem.innerHTML = roomobject.modulliste;
}




 class Room {
  constructor(tafeltext, backgroundimage, pfeillinks, pfeilmitte, pfeilrechts) {
    this.tafeltext = tafeltext;
    this.backgroundimage = backgroundimage;
    this.pfeillinks = pfeillinks;
    this.pfeilmitte = pfeilmitte;
    this.pfeilrechts = pfeilrechts;
  }

}
// -------------------------------------------
// "Räume" die draußen liegen
// -------------------------------------------
var streetview1 = new Room();
streetview1.backgroundimage = "url(../IMG/THM_Street_View_Bild1.svg)";
streetview1.pfeillinks = "createRoom(streetview2)";

var streetview2 = new Room();
streetview2.backgroundimage = "url(../IMG/StreetView_Bild2.svg)";
streetview2.pfeilmitte = "createRoom(streetview3)";

var streetview3 = new Room();
streetview3.backgroundimage = "url(../IMG/StreeView_Bild3_.svg)";
streetview3.pfeilmitte = "createRoom(streetview4)";

var streetview4 = new Room();
streetview4.backgroundimage = "url(../IMG/THM_Street_View_Bild_4.svg)";
streetview4.pfeilmitte = "createRoom(streetview5)";

var streetview5 = new Room();
streetview5.backgroundimage = "url(../IMG/Street_View_THM_5.svg)";
streetview5.pfeilmitte = "createRoom(thmgebaeude)";

var thmgebaeude = new Room ();
thmgebaeude.backgroundimage = "url(../IMG/Google_Street_View_THM6_Gebäudevonvorne.svg)";
thmgebaeude.pfeilmitte="createRoom(room_eingangshalle)";

var room_eingangshalle = new Room();
room_eingangshalle.name="thm";
room_eingangshalle.backgroundimage = "url(../IMG/eingang_THM.svg)";
room_eingangshalle.pfeillinks = "createRoom(floor_unten)";


// -------------------------------------------
// Einführungs Räume
// -------------------------------------------
var room_einfuehrung = new Room();
room_einfuehrung.backgroundimage= "url('../IMG/vorlesungsraum.svg')";
room_einfuehrung.pfeilmitte="createRoom(room_einfuehrungNah)";

var room_einfuehrungNah = new Room();
room_einfuehrungNah.name="einfuehrungsveranstaltung";
room_einfuehrungNah.tafeltext= "Herzlich willkommen in der aufregenden Welt der Medieninformatik an unserer Hochschule! Hier dreht sich alles um die einzigartige Verbindung von Medien und Informatik. Unser Fachbereich bietet zwei spannende Schwerpunkte: Web & Mobile sowie Medienproduktion. Wähle deinen Pfad und tauche ein in die faszinierende Welt der digitalen Medien. Gemeinsam werden wir innovative Lösungen entwickeln und die Zukunft gestalten. Als Medieninformatiker vereinst du Technologie und Kreativität zu einem faszinierenden Zusammenspiel. Tauche ein in die Welt digitaler Medien, entwickle innovative Lösungen und gestalte beeindruckende Benutzererlebnisse. Ob Web, Mobile oder Medienproduktion - erkunde die vielfältigen Möglichkeiten der digitalen Welt und gestalte aktiv die Zukunft mit. Willkommen im Studiengang Medieninformatik!<br><i>Klicke auf eins der beiden Maskottchen um mehr über die beiden Schwerpunkte zu erfahren!</i>";
room_einfuehrungNah.backgroundimage= "url('../IMG/vorlesungsraum_nah_ohne_beamer.svg')";
room_einfuehrungNah.pfeillinks= "createRoom(floor_unten)";
room_einfuehrungNah.pfeilrechts="createRoom(floor_unten)";




var room_startEnte = new Room();
room_startEnte.name="ente";
room_startEnte.tafeltext = "Willkommen im faszinierenden Bereich der Medienproduktion im Studiengang Medieninformatik! Hier kannst du als kreativer Schöpfer in Bild, Ton und Bewegung aufgehen. Tauche ein in die Kunst der Medienproduktion und erwecke Geschichten zum Leben. Von Videoproduktion über Animation bis zur Audiobearbeitung - du wirst in der Lage sein, beeindruckende Medienprojekte zu entwickeln, die Menschen begeistern. Werde Experte in der Medienproduktion und gestalte die Zukunft der digitalen Medien mit deiner künstlerischen Leidenschaft und technischen Know-how!<br><button onclick='setSchwerpunkt(medienproduktion)'>Jetzt Schwerpunkt wählen</button><button onclick='createRoom(room_einfuehrungNah)'>Anderen Schwerpunkt wählen</button>";
room_startEnte.backgroundimage = "...";
room_startEnte.pfeillinks = "createRoom(floor_unten)";
room_startEnte.pfeilrechts = "createRoom(floor_unten)";

var room_startRoboter = new Room();
room_startRoboter.name="roboter";
room_startRoboter.tafeltext = "Willkommen im aufregenden Bereich der Web- und Mobile-Entwicklung im Studiengang Medieninformatik! Hier lernst du die Kunst des digitalen Designs und interaktive Technologien. Du entwickelst ästhetische Websites mit reibungslosen Benutzererlebnissen und gestaltest intuitive Benutzeroberflächen für mobile Apps. Werde Experte in der Web- und Mobile-Entwicklung und gestalte die Zukunft digitaler Medien!<br><button onclick='setSchwerpunkt(webandmobile)'>Jetzt Schwerpunkt wählen</button><button onclick='createRoom(room_einfuehrungNah)'>Anderen Schwerpunkt wählen</button>";
room_startRoboter.backgroundimage = "...";
room_startRoboter.pfeillinks = "createRoom(floor_unten)";
room_startRoboter.pfeilrechts = "createRoom(floor_unten)";

var floor_unten = new Room();
floor_unten.backgroundimage ="url('../IMG/Flur.svg')";
floor_unten.pfeilmitte="createRoom(room_einfuehrung)";
floor_unten.endraum="true";



var floor_aufzug = new Room();
floor_aufzug.backgroundimage ="url('../IMG/Aufzug.svg')";
floor_aufzug.pfeillinks = "createRoom(floor_unten)";
floor_aufzug.pfeilmitte = "createRoom(floor_medienproduktion)";


// -------------------------------------------
// Räume für den Schwerpunkt "Web & Mobile"
// -------------------------------------------
var floor_webandmobile = new Room();
floor_webandmobile.name="webandmobileflur";
floor_webandmobile.backgroundimage = "url(../IMG/Türe_an_der_wand.svg)";
floor_webandmobile.pfeillinks = "createRoom(room_webdesign)";
floor_webandmobile.pfeilmitte = "createRoom(floor_aufzug)";
floor_webandmobile.pfeilrechts = "createRoom(room_software)";
floor_webandmobile.endraum="true";

var room_webdesign = new Room();
room_webdesign.name="webdesign";
room_webdesign.backgroundimage = "url(../IMG/vorlesungsraum.svg)";
room_webdesign.pfeilmitte = "createRoom(room_webdesignNah)";


var room_webdesignNah = new Room();
room_webdesignNah.tafeltext="Im Bereich des Webdesign wird, wie der Name schon sagt, sich auf das Design fokussiert. Es wird nicht nur eine Webseite programmiert, vielmehr wird es um die kreative Gestaltung  einer Webseite gehen.Die Wahlpflichmodule konzentrieren sich neben der Verwaltung von Dokumenten hauptsächlich  auf die Erstellung und Bedienung von touchbasierten Systemen. Im Fokus werden anhand neuester Technologien Web-Frameworks gestaltet und moderne Webanwendungen entwickelt. Welche neuen Technologien gibt es und wie werden sie angewendet? Ein Beispiel sind Lernapps oder moderne Lernangebote, die mittlerweile undenkbar sind. Hier wird Technologie und Lernen miteinander verbunden und praxisnah erlebt.<br><button><a href='indexMiniGameWebdesign.html'>Jetzt Spiel starten</a></button><button onclick='showModullist(room_webdesignNah)'>Modulliste anzeigen</button> ";
room_webdesignNah.modulliste="Webprogrammierung 1 & 2 | Mediengestaltung 2 | Front End Development | Content Managment Systems | Web Framworks | Aktuelle Web- und Mobile Technologien | Digitales Lehren und Lernen<br><button onclick='createRoom(room_webdesignNah)'>Zurück</button>";
room_webdesignNah.backgroundimage = "url('../IMG/vorlesungsraum_nah_ohne_beamer.svg')";
room_webdesignNah.pfeilmitte = "createRoom(floor_webandmobile)";
room_webdesignNah.endraum="true";

var room_software = new Room();
room_software.name="software";
room_software.backgroundimage = "url(../IMG/Computerraum.svg)";
room_software.pfeilmitte = "createRoom(room_softwareNah)";

var room_softwareNah = new Room();
room_softwareNah.tafeltext = "Verschiedene Aspekte der Informatik werden aufgegriffen. Von einfacher Programmierung bis hin zu anspruchsvolleren Themen wie Algorithmen und Datenstrukturen ist alles dabei. Hier werden nicht nur technische Aspekte, sondern auch kreative Fähigkeiten wie Design und Gestaltung erlernt. In diesem Bereich lernen Studenten den Umgang mit Datenbanken und die Wichtigkeit der Sicherheit im Netz kennen. Dabei arbeiten sie praxisorientiert in Gruppen an bestimmten Aufgaben und entwickeln soziale Fähigkeiten, wie Verantwortungs- und Problembewusstsein. Die Zukunft in den Bereichen Smart Home und Smart Living nehmen in unserem Alltag immer mehr an Bedeutung. Wie funktioniert die Interaktion von Mensch und Maschine? Diese Aspekte der Industrie 4.0 werden von den beiden Wahlpflichtmodule behandelt.<br><button><a href='../HTML/Minispiel/Hamster/Hamster.html'>Jetzt Spiel starten</a></button><button onclick='showModullist(room_softwareNah)'>Modulliste anzeigen</button>"
room_softwareNah.modulliste="Softwareentwickelung 1 & 2 | Theoretische Informatik & Algorithmik | Mobile Anwendungen 1 & 2 | Datenbanken | Netzweksicherheit | Internet of Things<br><button onclick='createRoom(room_softwareNah)'>Zurück</button>";
room_softwareNah.backgroundimage = "url(../IMG/Computerraum_Nah.svg)";
room_softwareNah.pfeilmitte = "createRoom(floor_webandmobile)";
room_softwareNah.endraum="true";

var room_grundlagen = new Room();
room_grundlagen.name="grundlagen";
room_grundlagen.backgroundimage = "url(../IMG/SeminarRaum_BeamerRunter.svg )";
room_grundlagen.pfeilmitte = "createRoom(room_grundlagenNah)";


var room_grundlagenNah = new Room();
room_grundlagenNah.backgroundimage = "url(../IMG/Seminarraum.svg)";
room_grundlagenNah.tafeltext = "Weniger Praxisnah, jedoch sind diese Module wichtig, um ein gewisses Grundverständnis zu bekommen und sich allgemeines Wissen anzueignen, welches sowohl im Medien- als auch im Webbereich gebraucht wird. Eine Art Vorbereitung, nicht nur auf den Studiengang, sondern auch auf die spätere Berufswelt-<br><button><a href='indexGrundwissen.html'>Jetzt Spiel starten</a></button><button onclick='showModullist(room_grundlagenNah)'>Modulliste ansehen</button>";
room_grundlagenNah.modulliste = "Mathematik | IT- und Medienrecht | Seminar<button onclick='createRoom(room_grundlagenNah)'>Zurück</button>";
room_grundlagenNah.pfeilmitte = "createRoom(room_eingangshalle)";
room_grundlagenNah.endraum="true";


var room_managment = new Room();
room_managment="managment";
room_managment.backgroundimage = "url(../IMG/SeminarRaum_BeamerRunter.svg )";
room_managment.pfeilmitte = "createRoom(room_managmentNah)";

var room_managmentNah = new Room();
room_managmentNah.backgroundimage = "url(../IMG/Seminarraum.svg)";
room_managmentNah.tafeltext = "Die Vorbereitung auf die zukünftige Arbeitswelt erfordert nicht nur Fachwissen, sondern auch fundiertes Management-Know-how und Erfahrungen mit großen Projekten. In diesem Zusammenhang steht vor allem die Zusammenarbeit, Kommunikation und Teamfähigkeit innerhalb einer Gruppe im Fokus. Zusätzlich zur finanziellen Seite spielen bei der Gründung eines Unternehmens viele weitere Aspekte eine entscheidende Rolle. Wie kann ich ein erfolgreiches Start-up gründen? Und wie führe ich es nach der Gründung auf Erfolgskurs? Diese Fragen werden schrittweise unter Berücksichtigung der Managementperspektive beantwortet.<br><button><a href='indexMiniGameManagement.html'>Jetzt Spiel starten</a></button><button onclick='showModullist(room_managmentNah)'>Modulliste anzeigen</button>";
room_managmentNah.modulliste = "Softwareentwickelungsprojekt | Medienprojekt | BWL | Unternehmensgrüdung und -führung<br><button onclick='createRoom(room_managmentNah)'>Zurück</button>";
room_managmentNah.pfeilmitte = "createRoom(room_eingangshalle)";
room_managmentNah.endraum="true";

// -------------------------------------------
// Räume für den Schwerpunkt "Medienproduktion
// -------------------------------------------
var floor_medienproduktion = new Room();
floor_medienproduktion.backgroundimage = "url(../IMG/flur_oben.jpg.2023_06_20_10_17_54.0.svg)";
floor_medienproduktion.pfeilmitte = "createRoom(room_videoundton)";
floor_medienproduktion.pfeilrechts = "createRoom(room_dreiD)";

var room_dreiD = new Room();
room_dreiD.name="dreiD"
room_dreiD.backgroundimage ="url(../IMG/Computerraum.svg)";
room_dreiD.pfeilmitte = "createRoom(room_dreiDNah)";

var room_dreiDNah = new Room();
room_dreiDNah.backgroundimage ="url(../IMG/Computerraum_Nah.svg)";
room_dreiDNah.tafeltext = "In der Welt der 3D-Computergrafik wird schrittweise der Weg bis zur Animation angelernt. Angefangen mit der leichten Modellierung einer Ente endet es mit der Animation von einem eigenen Charakter. Welcher Prozess hinter den bekanntesten Animationsfilmen von Disney und co. steckt, wird hier praxisnah erlebt. In diesen Wahlpflichfächern wird noch tiefer in die Welt der Animation geblickt. Durch neu erlente Special Effects und High Renderings erlangt die Animationswelt ein neues Level. Diesmal wird bewusst auf zweisprachiger Ebene, nämlich auf Deutsch und Englisch gearbeitet, um ein internationales Niveau zu erreichen. Mithilfe von CAD und Beleuchtungstechnik werden angelernte Kenntnisse auf der Bühne  angewandt. Wie wird die Bühne richtig in Szene gesetzt? Wie schafft man es, auf einer Bühne eine perfekte Beleuchtung zu realisieren? Von der Simulation bis hin zur Umsetzug auf der Bühne, wird eine perfekte Szene erschaffen<br><button><a href='indexMiniGame3D.html'>Jetzt Spiel starten</button><button onclick='showModullist(room_dreiDNah)'>Modulliste anzeigen</button>";
room_dreiDNah.modulliste="Grafische Datenverarbeitung Modellierung, Shading und Animation | Fortgeschrittene Modellierung | Dynamik und Effekte | Motion Design | E-Media International Summer School | Beleuchtung | CAD | Szenographie<br><button onclick='createRoom(room_dreiDNah)'>Zurück</button>";
room_dreiDNah.pfeilmitte = "createRoom(floor_medienproduktion)";
room_dreiDNah.endraum="true";

var room_videoundton = new Room();
room_videoundton.name="videoundton"
room_videoundton.backgroundimage = "url(../IMG/Tonstudio.svg)";
room_videoundton.pfeilmitte = "createRoom(room_videoundtonNah)";


var room_videoundtonNah = new Room();
room_videoundtonNah.backgroundimage = "url(../IMG/Laptop_Nahansicht_Tonstudio.svg)";
room_videoundtonNah.tafeltext = "Von der Analyse eines Musikvideos bis zur eigenen Produktion eines Musikvideos. Was passiert hinter den Kulissen eines Musikvideos, was hinter einem Liveauftritt? Damit verbunden ist die Produktion und Technik von Film und Studio. In einem Studio wird professionell mit Kamera, Mikrofon und Licht gearbeitet. Vertiefung in Foto und Bild und Auswirkung verschiedener Faktoren auf dieser. Dabei geht es nicht nur um technisches Wissen und dem Umgang mit Kamera, sondern auch um kreative und gestalterische Fähigkeiten, um am Ende eindrucksvolle Bilder zu kreieren.<button><a href='indexMiniGameMedienproduktion.html'>Jetzt Spiel starten</button><button onclick='showModullist(room_videoundtonNah)'>Modulliste anzeigen</button>";
room_videoundtonNah.modulliste= "Mediengestaltung 1 | Audiovisuelle Medien 1,2 & 3 | Fotografie und Bildbearbeitung<br><button onclick='createRoom(room_videoundtonNah)'>Zurück</button>";
room_videoundtonNah.pfeilmitte = "createRoom(floor_medienproduktion)";
room_videoundtonNah.endraum="true";

//xmlAuslesen ();


var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iScrollAt = 20; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

function typewriter(aText)
{
    sContents = ' ';
    iRow = Math.max(0, iIndex-iScrollAt);
    var destination = document.getElementById("tafeltext");
    var iArrLength = aText[0].length; // the length of the text array

    while ( iRow < iIndex ) {
        sContents += aText[iRow++] + '<br />';
    }
    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "<img src=\"../IMG/kreide_1.svg\" class=\"pencil\" height=\"21\" width=\"20\"/>";
    if ( iTextPos++ == iArrLength ) {
        iTextPos = 0;
        iIndex++;
        if ( iIndex != aText.length ) {
            iArrLength = aText[iIndex].length;
            setTimeout("typewriter(aText)", 500);
        }
    } else {
        setTimeout("typewriter(aText)", iSpeed);
    }
}