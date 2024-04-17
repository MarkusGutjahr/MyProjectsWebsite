INSERT INTO erkrankung (ErkNr, erk_Name) VALUES
(1, 'Fehlsichtigkeit'),
(2, 'Grippe'),
(3, 'Akute Bronchitis'),
(4, 'Herzschwäche'),
(5, 'Demenz'),
(6, 'Multiple Sklerose'),
(7, 'Migräne'),
(8, 'Delir'),
(9, 'Osteoporose'),
(10, 'Parkinson'),
(11, 'Schlaganfall'),
(12, 'keine');

INSERT INTO  symptome (SymNr, sym_Name) VALUES
(1, 'Kopfschmerzen'),
(2, 'Husten'),
(3, 'Fieber'),
(4, 'verschwommene Sicht'),
(5, 'Gedächtnisverlust'),
(6, 'Herzschmerzen'),
(7, 'Auschlag'),
(8, 'Zittern'),
(9, 'Ohnmacht'),
(10, 'Wahrnehmungsverlust'),
(11, 'Gelenkschmerzen'),
(12, 'keine');

INSERT INTO krankheitsfall (KNr, k_ErkNr, k_SymNr, k_Staerke) VALUES
(1, 1, 4, 'stark'),
(2, 1, 4, 'schwach'),
(3, 2, 3, 'stark'),
(4, 2, 3, 'schwach'),
(5, 3, 2, 'mittel'),
(6, 5, 5, 'anfang'),
(7, 11, 6, 'stark'),
(8, 7, 1, 'stark'),
(9, 7, 1, 'schwach'),
(10, 10, 8, 'stark'),
(11, 10, 8, 'mittel'),
(12, 10, 8, 'schwach'),
(13, 4, 6, 'schwach'),
(14, 4, 9, 'kurz'),
(15, 12, 12, 'keine');

INSERT INTO materialien (MatNr, mat_Name, mat_Preis, mat_Menge) VALUES
(1, 'Spritze', 3.00, 1),
(2, 'Putzlappen', 2.00, 10),
(3, 'Pflaster', 1.00, 20),
(4, 'Desinfektionsmittel', 4.00, 1),
(5, 'Gummihandschuhe', 2.00, 30),
(6, 'Putzmittel', 1.50, 1),
(7, 'Schwamm', 1.00, 5),
(8, 'Verband', 0.30, 1),
(9, 'Brille', 200.00, 1),
(10, 'Duschmittel', 5.00, 1);

INSERT INTO medizin (MedNr, med_Name, med_Preis, med_InhaltsMenge) VALUES
(1, 'COVID-Wirkstoff', 20.00, 1),
(2, 'Paracetamol', 10.00, 20),
(3, 'Ibuprofen', 10.00, 20),
(4, 'Hustensaft', 8.90, 1),
(5, 'Halsbonbon', 4.80, 25);

INSERT INTO pflegeleistungen (PLNr, pl_KNr, pl_Name, pl_Dauer) VALUES
(1, 15, 'COVID-Erstimpfung', '00:15:00'),
(2, 15, 'COVID-Auffrischimpfung', '00:15:00'),
(3, 15, 'Putzen', '01:20:00'),
(4, 15, 'Körperpflege', '00:40:00'),
(5, 15, 'Verbandswechsel', '00:30:00');

INSERT INTO materialpos (MatPOS, map_MatNr, map_PLNr) VALUES
(1, 1, 1),
(1, 1, 2),
(1, 2, 3),
(2, 5, 3),
(3, 6, 3),
(3, 7, 3),
(1, 7, 4),
(2, 10, 4);

INSERT INTO medizinpos (MedPOS, mep_MedNr, mep_PLNr) VALUES
(1, 1, 1),
(1, 1, 2);

INSERT INTO evaluationskatalog (EkNr, ek_Beschreibung) VALUES
(1, 'Mitarbeiter'),
(2, 'Pflegeeinsatz'),
(3, 'Unternehmen');

INSERT INTO firmenfahrzeug (Kennzeichen, f_Kilometerstand, f_TUEV, f_Reparaturen) VALUES
('GIPD1601', 94023.5, '2022-08-23', 'neue Kupplung'),
('GIPD1502', 176751.8, '2021-02-25', 'neue Windschutzscheibe');

INSERT INTO firmenfahrzeug (Kennzeichen, f_Kilometerstand, f_TUEV) VALUES
('GIPD1501', 164865.7, '2021-06-27'),
('GIPD1701', 78936.8, '2022-03-15'),
('GIPD1901', 89631.4, '2022-08-12');

INSERT INTO mitarbeiter (MNr, m_Name, m_Vorname, m_Geburtsdatum, m_Anschrift, m_PLZ, m_Stadt) VALUES
(1, 'Sonneborn', 'David', '2000-06-06', 'Sackgasse 6', 32123, 'Friedberg'),
(2, 'Gutjahr', 'Markus', '2000-02-10', 'Göbler 3', 30305, 'Grünberg'),
(3, 'Maier', 'Tom', '1996-05-17', 'Bahnhofstraße 13', 35390, 'Gießen'),
(4, 'Schmidt', 'Jan', '1998-11-09', 'Museumsstraße 25', 35396, 'Gießen'),
(5, 'Müller', 'Sabine', '1994-09-02', 'Marktplatz 3', 61169, 'Friedberg'),
(6, 'Himmel', 'Fabian', '2002-08-13', 'Homburger Straße 19', 61169, 'Friedberg'),
(7, 'Frank', 'Hubert', '1994-01-29', 'Bahnhofstraße 7', 61169, 'Friedberg');

INSERT INTO krankenkasse (KNr, k_Name, k_Art) VALUES
(1, 'AOK', 'ges'),
(2, 'AOK', 'pri'),
(3, 'HKK', 'ges'),
(4, 'HKK', 'pri'),
(5, 'TK', 'ges'),
(6, 'TK', 'pri'),
(7, 'BKK', 'ges'),
(8, 'BKK', 'pri'),
(9, 'IKK', 'ges'),
(10, 'IKK', 'pri');


INSERT INTO fahrzeugvergabe (fg_Kennzeichen, fg_MNr) VALUES
('GIPD1601', 1),
('GIPD1502', 4),
('GIPD1501', 3),
('GIPD1701', 5),
('GIPD1901', 6);

INSERT INTO patient (PNr, pat_KNr, pat_Name, pat_Vorname, pat_Geburtsdatum, pat_Anschrift, pat_PLZ, pat_Stadt, pat_VersichertenNr, pat_Angehoerige) VALUES
(1, 1, 'März', 'Herbert', '1945-06-24', 'Am Gleis 7', 60306, 'Frankfurt', 'A946285683','Tochter: Sabine März, Tel: 0123122132'),
(2, 3, 'Müller', 'Günther', '1942-10-11', 'Bahnhofstraße 18', 61169, 'Friedberg', 'G598275031','Sohn: Tim Günther, Tel: 0132913914'),
(3, 7, 'Schneider', 'Emma', '1943-11-19', 'Schulstraße 15', 61206, 'Wöllstadt', 'C859205167','Sohn: Jens Schneider, Tel: 0195762845'),
(4, 9, 'Fischer', 'Dieter', '1940-05-28', 'Ringstraße 9', 61197, 'Florstadt', 'L470184127','Tochter: Sarah Fischer, Tel: 04769265831'),
(5, 4, 'Becker', 'Gabriel', '1938-07-04', 'Erlenweg 23', 35510, 'Butzbach', 'P492018537','Tochter: Lisa Becker, Tel: 07673956285');

INSERT INTO tourenplanung (t_MNr, t_Datum, t_Dauer, t_Laenge) VALUES
(3, '2022-12-20', '05:45:00', 80.5),
(4, '2022-12-20', '06:30:00', 90.0),
(1, '2022-12-21', '05:20:00', 78.3),
(4, '2022-12-21', '07:50:00', 122.5),
(1, '2022-12-22', '07:35:00', 115.7),
(2, '2022-12-22', '05:10:00', 73.0),
(3, '2022-12-22', '06:20:00', 96.6),
(6, '2022-12-22', '06:40:00', 98.4);

INSERT INTO tourenpos (TPOS, tp_MNr, tp_PNr, tp_Datum) VALUES
(1, 3, 1, '2022-12-22'),
(2, 3, 2, '2022-12-22'),
(3, 3, 5, '2022-12-22'),
(1, 6, 4, '2022-12-22'),
(2, 6, 5, '2022-12-22'),
(3, 6, 3, '2022-12-22'),
(4, 6, 2, '2022-12-22'),
(5, 6, 1, '2022-12-22');

INSERT INTO pflegeeinsatz (PENr, pe_TPOS, pe_MNr, pe_PNr, pe_PLNr, pe_Datum, pe_Beginn, pe_Ende) VALUES
(1, 1, 3, 1, 1, '2022-12-22', '11:10:00', '11:30:00'),
(2, 2, 3, 2, 5, '2022-12-22', '13:00:00', '13:30:00'),
(3, 3, 3, 5, 3, '2022-12-22', '13:50:00', '15:20:00'),
(4, 1, 6, 4, 4, '2022-12-22', '08:20:00', '09:10:00'),
(5, 2, 6, 5, 1, '2022-12-22', '09:40:00', '10:00:00'),
(6, 3, 6, 3, 2, '2022-12-22', '10:40:00', '11:00:00'),
(7, 4, 6, 2, 3, '2022-12-22', '11:45:00', '13:10:00'),
(8, 5, 6, 1, 1, '2022-12-22', '14:40:00', '15:00:00'),
(9, 5, 6, 1, 4, '2022-12-22', '15:00:00', '15:40:00');

INSERT INTO abrechnung (ANr, a_Datum, a_Gesamtkosten) VALUES
(1, '2023-01-01', 1560.00),
(2, '2023-01-01', 3027.80),
(3, '2023-01-01', 2395.99),
(4, '2023-01-01', 1879.34),
(5, '2023-01-01', 4519.67);

INSERT INTO abrechnungspos (APOS, ap_ANr, ap_PENr) VALUES
(1, 1, 4),
(2, 1, 5),
(3, 1, 6),
(4, 1, 7),
(5, 1, 8);

INSERT INTO evaluation (ENr, e_EkNr, e_MNr, e_PNr, e_PENr, e_Bewertung) VALUES
(1, 1, 3, 1, 1, 100),
(2, 1, 6, 4, 4, 100),
(3, 3, 6, 2, 7, 95),
(4, 2, 3, 5, 3, 98);