CREATE TABLE mitarbeiter (
	PNr INTEGER NOT NULL,
	Name VARCHAR(100),
	Abteilung VARCHAR(100),
	CONSTRAINT pkmitarbeiter PRIMARY KEY (PNr)
);

CREATE TABLE projekt(
	ProjektNr INTEGER,
	ProjektName VARCHAR(100),
	Beginndatum DATE,
	Budget float8,
	CONSTRAINT pkprojekt PRIMARY KEY (ProjektNr)
);

CREATE TABLE projektmitarbeit (
	PNr INTEGER,
	ProjektNr INTEGER,
	Taetigkeit VARCHAR(100),
	Stunden float8,
	CONSTRAINT pkprojektmitarbeit PRIMARY KEY (PNr, ProjektNr),
	CONSTRAINT fkmitarbeiterprojektmitarbeit FOREIGN KEY (PNr) REFERENCES mitarbeiter(PNr) ,
	CONSTRAINT fkprojektprojektmitarbeit FOREIGN KEY (ProjektNr) REFERENCES projekt(ProjektNr)
);