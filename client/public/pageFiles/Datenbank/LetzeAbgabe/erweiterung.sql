CREATE TABLE evaluationskatalog(
	EkNr INTEGER, 
	ek_Name VARCHAR(100),
	CONSTRAINT pkevaluationskatalog PRIMARY KEY (EkNr)
);

CREATE TABLE evaluationsfragen(
	EFPOS INTEGER,
	ep_EkNr INTEGER, 
	ep_Frage VARCHAR(50),
	CONSTRAINT pkevaluationsfragen PRIMARY KEY (EFRA)
);

CREATE TABLE evaluationsantworten(
	EAPOS INTEGER,
	ea_EkNr INTEGER, 
	ea_Antwort VARCHAR(50),
	CONSTRAINT pkevaluationantworten PRIMARY KEY (EANT)
);







INSERT INTO evaluationskatalog (EkNr, ek_Name) VALUES
(1, 'Mitarbeiter Evaluation'),
(2, 'Pflegeeinsatz Evaluation'),
(3, 'Unternehmens Evaluation');

INSERT INTO evaluationsfragen (EFPOS, ep_EkNr, ep_Frage) VALUES
(1, 1,'Ist der Mitarbeiter freundlich im Umgang mit den Patienten?'),
(2, 1,'Ist der Mitarbeiter ist offen für Fragen?'),
(3, 1,'Ist der Mitarbeiter pünktlich beim Patienten?'),
(1, 2,'Haben sie sich beim Einsatz wohl gefühlt?'),
(2, 2,'Wurde auf ihre Fragen und Wünsche eingegangen?'),
(3, 2,'Wurden alle Aufgaben während des Einsatzes erledigt?'),
(1, 2,'Sind sie zufrieden mit den Preisen des Pflegedienstes?'),
(2, 2,'Sind sie zufrieden mit der Durchführung der Pflegeeinsätze?'),
(3, 2,'Sind sie zufrieden mit den ihnen empfohlenen Hilfsmitteln?');

INSERT INTO evaluationsantworten (EFPOS, ep_EkNr, ep_Frage) VALUES
()
