INSERT INTO abteilung (AbtNr, AbtName)
VALUES (1,'Geschaeftsleitung'),
       (2,'IT-Abteilung'), 
       (3,'Personalabteilung'),
       (4,'Softwareentwicklung')
       ;

INSERT INTO mitarbeiter (PNr, Name, AbtNr, Gehalt)
VALUES (1,'Hirsch',3,'4000.00'),
       (2,'Piekarski',2,'3500.00'),
       (3,'Kutschke',1,'5190.50'),
       (4,'Kunz',4,'4000.00'),
       (5,'Richter',4,'3500.00'),
	   (6,'Hirsch',1,'8000.00')
       ;

INSERT INTO hotel (HNr, HName, Kategorie, PLZ, Ort)
VALUES (1,'Zur Post','teuer','65210','Entenhausen'),
       (2,'Alpenhotel','normal','85214','Hamburg'),
       (3,'Pension 7','günstig','96385','Harrachov'),
       (4,'Zur Quelle','schlecht','00001','Gießen');

INSERT INTO reisen (Mitarbeiter, Hotel, Beginndatum, Dauer, Kosten)
VALUES (1,2,'2022-08-22',5,'2149.50'),
       (2,2,'2022-08-22',5,'2149.50'),
       (2,1,'2022-11-02',2,'1100.99'),
       (3,3,'2020-01-01',20,'5555.50'),
       (3,1,'2012-05-11',4,'645.50'),
       (2,1,'2012-05-11',4,'645.50'),
       (3,3,'2010-05-05',6,'500.9'),
       (6,2,'2022-06-21',7,'5000.00'),
	   (6,2,'2022-07-15',11,'6500.00'),
	   (6,4,'2022-08-29',3,'200.00');