INSERT INTO mitarbeiter (pnr, name, abteilung)
VALUES (1, 'Gutjahr', 'Hausmeister'),
(2, 'Sonneborn', 'Geschaeftsleitung'),
(3, 'Engl', 'Softwareentwicklung'),
(4, 'Brosch', 'Medienabteilung'),
(5, 'AVSebastian', 'GDV-Abteilung'),
(6, 'Engfeld', 'AV-Prof');

INSERT INTO projekt (projektnr, projektname, beginndatum, budget)
VALUES (1,'Hausbau', '2022-12-02', '8000.50'),
(2,'Event','1990-05-04', '500000'),
(3,'Festival','2030-01-01', '50000'),
(4,'Abriss','2019-10-25', '300000000'),
(5,'Erneuerung','2019-10-25', '50000');

INSERT INTO projektmitarbeit (pnr, projektnr, taetigkeit, stunden)
VALUES (2, 3, 'feiern', '70'),
(1,4, 'schwer arbeiten', '247'),
(3,1,'bauen', '800'),
(4,2, 'nix machen', '50'),
(5,5, 'keine Ahnung', '300.4');