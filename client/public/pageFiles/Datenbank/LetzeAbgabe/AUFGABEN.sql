 -- Aufgabe 1
-- Welche Pflegeleistung wird am haeufgsten in Anspruch genommen?
/*
CREATE OR REPLACE VIEW anzAnsprGenomm AS 
SELECT pl.pl_Name as plName, COUNT(pe.pe_PLNR) as haeufigkeit
FROM pflegeleistungen pl JOIN pflegeeinsatz pe ON (PLNr = pe_PLNr)
GROUP BY pl.pl_Name;


SELECT plName
FROM anzAnsprGenomm
WHERE haeufigkeit IN (SELECT MAX(haeufigkeit)
				   	  FROM anzAnsprGenomm)
;
*/




-- Aufgabe 2
-- Wie alt ist der durchschnittliche Patient?
/*
SELECT (SUM(CURRENT_DATE - pat_Geburtsdatum)/ COUNT(pat_Geburtsdatum)) / 365.0 AS Durchschnittsalter
FROM patient
;
*/




-- Aufgabe 3
-- In welcher Kategorie werden die Mitarbeiter von Ihren Patienten besonders schlecht bewertet?
/*
CREATE OR REPLACE VIEW avgBew AS
SELECT AVG(e.e_Bewertung) as avgBewertung, ek.ek_Beschreibung AS schlechteBewertung
FROM evaluationskatalog ek JOIN evaluation e ON (ekNr = e_EkNr)
GROUP BY ek.ek_Beschreibung;

SELECT schlechteBewertung
FROM avgBew
WHERE avgBewertung in (SELECT MIN(avgBewertung)
				   FROM avgBew)
;
*/




-- Aufgabe 4
-- Was ist die zeitlich längste Pflegetour des letzten Jahres?
/*
SELECT MAX(t_Dauer) AS laengsteTour
FROM tourenplanung
WHERE t_Datum BETWEEN (CURRENT_DATE - 365) AND CURRENT_DATE
;
*/









-- Eigene Frage 1
-- Der wievielte Zwischenstopp ist der Patient "Günther Müller" auf der Tour vom Mitarbeiter "Fabian Himmel" am 22.12.2022
/*
SELECT tp.TPOS
FROM mitarbeiter m JOIN tourenplanung t ON (MNr = t_MNr)
				   JOIN tourenpos tp ON (t_MNr = tp_MNr)
				   JOIN patient pat ON (tp_PNr = PNr)
WHERE pat.pat_Name = 'Müller' 
  AND pat.pat_Vorname = 'Günther'
  AND m.m_Name = 'Himmel'
  AND m.m_Vorname = 'Fabian'
  AND tp_Datum = '2022-12-22'
;
*/




-- Eigene Frage 2
-- Wie lange dauerte der längste Einsatz des letzten Jahres und wer war daran beteiligt?
/*
CREATE OR REPLACE VIEW einsDauer AS
SELECT (pe.pe_Ende - pe.pe_Beginn) AS Dauer, m.m_Name, m.m_Vorname, pat.pat_Name, pat.pat_Vorname
FROM mitarbeiter m JOIN tourenplanung t ON (MNr = t_MNr)
				   JOIN tourenpos tp ON (t_MNr = tp_MNr)
				   JOIN patient pat ON (tp_PNr = PNr)
				   JOIN pflegeeinsatz pe ON (TPOS = pe_TPOS);

SELECT DISTINCT Dauer, m_Name AS "Mitarbeiter Nachname", m_Vorname AS "Mitarbeiter Vorname", 
		pat_Name AS "Patient Nachname", pat_Vorname AS "Patient Vorname"
FROM einsDauer
WHERE Dauer IN (SELECT MAX(Dauer)
			   	FROM einsDauer)
;
*/




-- Eigene Frage 3
-- Wieviele Patienten sind privat und wievile gesetzlich Versichert?
/*
SELECT COUNT(k_Art), 'gesaetzlich' AS k_Art
FROM krankenkasse
WHERE k_Art = 'ges'
UNION
SELECT COUNT(k_Art), 'privat' AS k_Art
FROM krankenkasse
WHERE k_Art = 'pri'
;
*/




-- Eigene Frage 4
-- Welche Mitarbeiter haben kein Firmenfahrzeug?
/*
SELECT m.m_Name, m.m_Vorname
FROM mitarbeiter m LEFT JOIN fahrzeugvergabe fg ON (MNr = fg_MNr)
WHERE fg.fg_MNr IS NULL
;
*/