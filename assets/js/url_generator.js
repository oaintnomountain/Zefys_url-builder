/* Diese Funktion generiert eine URL zum Abruf von Zeitungsdigitalisaten
   anhand der ausgwählten Zeitung, Datum und gewünschten Seiten
   dazu wird die auf der Seite angezeigte URL aktualisiert, sobald einer der Eingabewerte
   geändert wird
 */

function updateDownloadUrl() {
    let elZeitung = document.getElementById('selectZeitung'); // Das Element zur Zeitungsauswahl
    let selectedZeitung = elZeitung.options[elZeitung.selectedIndex]; // Die aktuell ausgewählte Zeitung
    let selectedZeitungId = selectedZeitung.getAttribute('value'); //der ZDB-Code der Zeitung für die URL
    let selectedZeitungName = selectedZeitung.innerText; //Der Name der ausgewählten Zeitung
    let Jahr = document.getElementById('auswahlJahr').value; //das ausgewählte Jahr
    let Monat = document.getElementById('auswahlMonat').value.padStart(2,'0'); //der ausgewählte Monat 2-stellig
    let Tag = document.getElementById('auswahlTag').value.padStart(2,'0'); //der ausgewählte Tag 2-stellig
    let Seite = document.getElementById('auswahlSeite').value; //die ausgewählte Seite (0 wird vom Server als "alle" interpretiert
    /* Zum Aufbau der Abruf-URL siehe:https://lab.sbb.berlin/zefys/ */
    let neueURL = 'https://content.staatsbibliothek-berlin.de/zefys/SNP'
        + selectedZeitungId + '-' + Jahr + Monat + Tag + '-0-' + Seite + '-0-0.pdf';
    let elURL = document.getElementById('generierteURL');
    elURL.innerHTML = "<p><a href='" + neueURL +"' >" + neueURL +"</a>";

    let elJahr = document.getElementById('auswahlJahr'); //das Jahr Element
    let elMonat = document.getElementById('auswahlMonat'); //das Monatselement
    let elTag = document.getElementById('auswahlTag'); //das Tag Element

    /* standardwerte setzen für Tag und Monat falls sie zuvor eingeschränkt wurden (siehe unten) */
    elMonat.min = '1';
    elMonat.max = '12';
    elTag.min = '1';

    /* in Auswahlmöglichkeit Tage auf Monatslänge begrenzen */
    switch (Monat) {
        case '02':
            // Schaltjahre. Vereinfachte Rechnung da nur Zeitraum 1945 bis 1994 relevant
            if (parseInt(Jahr) % 4 == 0) {
                    elTag.max = '29';}
            else {
                    elTag.max = '28';
            }
            break;
        case '04':
        case '06':
        case '09':
        case '11':
            elTag.max = '30';
            break;
        default:
            elTag.max = '31';
            break;
    }

    /* In Auswahlmöglichkeit den Zeitraum an den digitalisierten Zeitraum der jeweiligen Zeitung anpassen */
    let alertZeitraum = document.getElementById('zeitraum'); // Element zur Ausgabe des Hinweises auf verfügbaren Zeitraum
    switch (selectedZeitungId) {
        case '26120215': // ZDB-Code für Berliner Zeitung (siehe oben)
            alertZeitraum.innerHTML = "<strong>Die Berliner Zeitung ist verfügbar " + // Hinweistext
                "für den Zeitraum vom 21. Mai 1945 bis zum 31. Dezember 1993</strong>";
            elJahr.min = '1945'; //erstes Jahr des Erscheinens (vorhandener Scans)
            elJahr.max = '1993'; //letztes Jahr, für das Scans zugänglich sind
            /* Feinjustierung für Anfang Zeitraum auf 21. Mai 1945 */
            if (Jahr == '1945') {
                    elMonat.min = '5';
                    if (Monat == '05') {
                        elTag.min = '21';
                    }       // Für Ende des Zeitraums Feinjustierung nicht nötig, da Zeitraum bis Ende des Jahres
            }
            break;
        case '2612273X': //ZDB-Code für Neue Zeit
            alertZeitraum.innerHTML = "<strong>Die Neue Zeit ist verfügbar " + //Hinweistext für alert-Kasten
                "für den Zeitraum vom 22. Juli 1945 bis zum 5. Juli 1994</strong>";
            elJahr.min = '1945'; //erstes vorhandenes Jahr
            elJahr.max = '1994'; //letztes vorhandenes Jahr
            /* Feinjustierung erster Monat/Tag im ersten Jahr */
            if (Jahr == '1945') {
                elMonat.min = '7';
                if (Monat == '07') {
                    elTag.min = '22';
                }
            }
            /* Feinjustierung letzter Monat/Tag der verfügbaren Ausgaben */
            if (Jahr == '1994') {
                elMonat.max = '7';
                if (Monat == '07') {
                    elTag.max = '5';
                }
            }
            break;
        case '2532889X': //ZDB-Cokde für Neues Deutschland
            alertZeitraum.innerHTML = "<strong>Das Neue Deutschland ist verfügbar " +
                "für den Zeitraum vom 23. April 1946 bis zum 3. Oktober 1990</strong>";
            elJahr.min = '1946';
            elJahr.max = '1990';
            /* Feinjustierung erster Monat/Tag im ersten Jahr */
            if (Jahr == '1946') {
                elMonat.min = '4';
                if (Monat == '04') {
                    elTag.min = '23';
                }
            }
            /* Feinjustierung letzter Monat/Tag der verfügbaren Ausgaben */
            if (Jahr == '1990') {
                elMonat.max = '10';
                if (Monat == '10') {
                    elTag.max = '3';
                }
            }
            break;
        /* Rückfallwert, der aber eigentlich nicht auftreten sollte */
        default:
            alertZeitraum.innerHTML = "<strong>Keine gültige Zeitung ausgewählt</strong> "
                + selectedZeitungId + ' ' +  + selectedZeitungName;
            break;
    }
}

/* EventListener, die auf Eingabe/Änderung eines Wertes reagieren und die Url-Update Funktion aufrufen */

let elZeitung = document.getElementById('selectZeitung');
elZeitung.addEventListener('change',updateDownloadUrl,false);

let elJahr = document.getElementById('auswahlJahr');
elJahr.addEventListener('change', updateDownloadUrl,false);

let elMonat = document.getElementById('auswahlMonat');
elMonat.addEventListener('change', updateDownloadUrl, false);

let elTag = document.getElementById('auswahlTag');
elTag.addEventListener('change', updateDownloadUrl, false);

let elSeite = document.getElementById('auswahlSeite');
elSeite.addEventListener('change',updateDownloadUrl,false);

onload(updateDownloadUrl())