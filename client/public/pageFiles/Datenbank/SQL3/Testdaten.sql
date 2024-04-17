INSERT INTO film (idFilm, Titel, Erscheinungsjahr, Laufzeit)
VALUES 
(1, 'Harry Potter', 2001, '00:30:00'),
(2, 'König der Löwen', 2000, '05:04:12'),
(3, 'Dracula', 1985, '01:38:10'),
(4, 'Star Wars', 2016, '01:30:45'),
(5, 'JJK', 2022, '02:02:02'),
(6, 'Hunger Games', 2016, '02:03:04'),
(7, 'Kung Fu Panda', 2017, '01:02:03'),
(8, 'Pokemon', 2013, '10:23:45'),
(9, 'Hangover', 1816, '03:59:59'),
(10, 'Reality', 2021, '01:30:45'),
(11, 'Der Untergang', 1980, '02:10:05')
;

INSERT INTO filiale (idFiliale, Name, Stadt)
VALUES(1, 'VTG', 'Giessen'),
(2, 'VTFM', 'Frankfurt'),
(3, 'VTF', 'Friedberg'),
(4, 'VTG', 'Grünberg'),
(5, 'VTR', 'Reiskirchen')
;

INSERT INTO kunde(idKunde, Vorname, Nachname, Email)
VALUES (1, 'Markus', 'Gutjahr', 'markus-gutjahr@outlook.de'),
(2, 'David', 'Sonneborn', 'david.sonneborn00@gmail.de'),
(3, 'Sebastian', 'Engl', 'seb.engl@web.de'),
(4, 'Jakob', 'Engfeld', 'jakob.eng@gmail.com'),
(5, 'Patricia', 'Brosch', 'pat.brosch@outlook.de')
;

INSERT INTO filialehatfilme(fi_idFiliale, f_idFilm, Stueckzahl)
VALUES (1, 1, 20),
(1, 2, 11),
(1, 3, 18),
(1, 4, 26),
(1, 5, 30),
(1, 6, 27),
(1, 7, 34),
(1, 8, 20),
(1, 9, 28),
(1, 10, 33),
(1, 11, 12),
(2, 1, 39),
(2, 2, 48),
(2, 3, 33),
(2, 4, 51),
(2, 5, 61),
(2, 6, 37),
(2, 7, 46),
(2, 8, 29),
(2, 9, 68),
(2, 10, 32),
(3, 1, 8),
(3, 2, 19),
(3, 3, 15),
(3, 4, 22),
(3, 5, 20),
(3, 6, 17),
(3, 7, 11),
(3, 8, 25),
(3, 9, 16),
(3, 10, 12),
(3, 11, 22),
(4, 1, 10),
(4, 2, 9),
(4, 3, 6),
(4, 4, 11),
(4, 5, 15),
(4, 6, 20),
(4, 7, 13),
(4, 8, 8),
(4, 9, 7),
(4, 10, 19),
(5, 1, 5),
(5, 2, 8),
(5, 3, 11),
(5, 4, 9),
(5, 5, 7),
(5, 6, 4),
(5, 7, 13),
(5, 8, 14),
(5, 9, 11),
(5, 10, 9)
;

INSERT INTO verleih(k_idKunde, fihf_idFiliale, fihf_idFilm, Verleihdatum)
VALUES(1, 4, 5, '2022-11-21'),
(2, 2, 7, '2020-04-13'),
(3, 5, 3, '2022-09-29'),
(4, 1, 8, '2022-10-16'),
(5, 3, 6, '2022-11-02'),
(3, 4, 7, '2022-11-17'),
(3, 2, 1, '2019-04-25'),
(4, 3, 2, '2021-10-19'),
(1, 1, 11, '2022-11-18'),
(5, 1, 9, '2022-11-07')
;