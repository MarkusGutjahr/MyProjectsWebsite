DELIMITER //
CREATE TRIGGER patientenSichern
BEFORE DELETE ON patienten FOR EACH ROW
BEGIN
	CREATE TABLE IF NOT EXISTS sicherungPatienten(
		s_PNr INTEGER, 
		s_pat_KNr INTEGER,
		s_pat_Name VARCHAR(30), 
		s_pat_Vorname VARCHAR(30), 
		s_pat_Geburtsdatum DATE, 
		s_pat_Anschrift VARCHAR(100),
		s_pat_PLZ DECIMAL(5,0),
		s_pat_Stadt VARCHAR(40),
		s_pat_VersichertenNr VARCHAR(30),
		s_pat_Angehoerige VARCHAR(200),
		CONSTRAINT pksicherungpatient PRIMARY KEY (s_PNr),
		CONSTRAINT fksicherungpatient FOREIGN KEY (s_pat_KNr) REFERENCES Krankenkasse (KNr)
	);
	INSERT INTO sicherungPatienten(s_PNr, s_pat_KNr, s_pat_Name, s_pat_Vorname, s_pat_Geburtsdatum,
									s_pat_Anschrift, s_pat_PLZ, s_pat_Stadt, s_pat_VersichertenNr, 
								   s_pat_Angehoerige) VALUES
								   (old.s_PNr, old.s_pat_KNr, old.s_pat_Name, old.s_pat_Vorname, 
									old.s_pat_Geburtsdatum, old.s_pat_Anschrift, old.s_pat_PLZ, 
									old.s_pat_Stadt, old.s_pat_VersichertenNr, old.s_pat_Angehoerige);
END //
DELIMITER ;

