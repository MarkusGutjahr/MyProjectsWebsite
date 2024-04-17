CREATE TABLE abteilung (
	AbtNr INTEGER,
	AbtName VARCHAR(50),
	CONSTRAINT pkabteilung 
		PRIMARY KEY (AbtNr)
);

CREATE TABLE mitarbeiter (
	PNr INTEGER,
	Name VARCHAR(50),
	AbtNr INTEGER,
	Gehalt float8,
	CONSTRAINT pkmitarbeiter 
		PRIMARY KEY (PNr),
	CONSTRAINT fkabteilungmitarbeiter
		FOREIGN KEY (AbtNr)
			REFERENCES abteilung (AbtNr)
);

CREATE TABLE hotel (
	HNr INTEGER,
	HName VARCHAR(50),
	Kategorie VARCHAR(50),
	PLZ DECIMAL(5,0),
	Ort VARCHAR(50),
	CONSTRAINT pkhotel
		PRIMARY KEY (HNr)
);

CREATE TABLE reisen (
	Mitarbeiter INTEGER,
	Hotel INTEGER,
	Beginndatum DATE,
	Dauer float8,
	Kosten float8,
	CONSTRAINT pkreisen 
		PRIMARY KEY (Mitarbeiter, Hotel, Beginndatum),
	CONSTRAINT fkmitarbeiterreisen 
		FOREIGN KEY (Mitarbeiter)
			REFERENCES mitarbeiter (PNr),
	CONSTRAINT fkhotelreisen 
		FOREIGN KEY (Hotel)
			REFERENCES hotel (HNr)
);