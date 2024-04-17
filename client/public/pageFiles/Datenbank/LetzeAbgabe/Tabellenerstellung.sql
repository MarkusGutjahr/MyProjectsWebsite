CREATE TABLE evaluationskatalog(
	EkNr SERIAL PRIMARY KEY, 
	Beschreibung VARCHAR(100)
	--CONSTRAINT pkevaluationskatalog PRIMARY KEY (EkNr)
);

CREATE TABLE firmenfahrzeug(
	Kennzeichen VARCHAR(8),
 	Kilometerstand NUMERIC(7,1),
	TUEV DATE,
	Reparaturen VARCHAR(200),
	CONSTRAINT pkfirmenfahrzeug PRIMARY KEY (Kennzeichen)
);

CREATE TABLE mitarbeiter(
	MNr SERIAL PRIMARY KEY, 
	Name VARCHAR(30), 
	Vorname VARCHAR(30), 
	Geburtsdatum DATE, 
	Anschrift VARCHAR(100),
	PLZ NUMERIC(5),
	Stadt VARCHAR(40)
);

CREATE TABLE krankenkasse(
	KNr SERIAL PRIMARY KEY, 
	Name VARCHAR(30), 
	Art VARCHAR(20)
);

CREATE TABLE pflegeleistungen(
	PLNr SERIAL PRIMARY KEY, 
	Name VARCHAR(30), 
	Dauer NUMERIC(5, 2),
	Kosten float8, 
	Beschreibung VARCHAR(200), 
	Anwendungsfall VARCHAR(100), 
	Materialien VARCHAR(200)
);

CREATE TABLE benutzt(
	Kennzeichen VARCHAR(8), 
	MNr SERIAL,
	CONSTRAINT pkbenutzt PRIMARY KEY (Kennzeichen, MNr),
	CONSTRAINT fkbenutztKennzeichen FOREIGN KEY (Kennzeichen) REFERENCES firmenfahrzeug (Kennzeichen),
	CONSTRAINT fkbenutztMNr FOREIGN KEY (MNr) REFERENCES mitarbeiter (MNr)
);

CREATE TABLE patient(
	PNr SERIAL PRIMARY KEY, 
	Name VARCHAR(30), 
	Vorname VARCHAR(30), 
	Geburtsdatum DATE, 
	Anschrift VARCHAR(100),
	PLZ NUMERIC(5),
	Stadt VARCHAR(40),
	VersichertenNr VARCHAR(30),
	KNr SERIAL,
	CONSTRAINT fkpatient FOREIGN KEY (KNr) REFERENCES Krankenkasse (KNr)
);

CREATE TABLE tourenplanung(
	MNr SERIAL, 
	PNr SERIAL, 
 	--Strecke/Zwischenstopps ??????,
	Dauer NUMERIC(5, 2),
	Laenge NUMERIC(4,1),
	CONSTRAINT pktourenplanung PRIMARY KEY (MNr, PNr),
	CONSTRAINT pktourenplanungMNr UNIQUE (MNR),
	CONSTRAINT pktourenplanungPNr UNIQUE (PNR),
	CONSTRAINT fktourenplanungMNr FOREIGN KEY (MNr) REFERENCES mitarbeiter (MNr),
	CONSTRAINT fktourenplanungPNr FOREIGN KEY (PNr) REFERENCES patient (PNr)
);

CREATE TABLE pflegeeinsatz(
	PENr SERIAL PRIMARY KEY, 
	MNr SERIAL, 
	PNr SERIAL,
	PLNr SERIAL, 
	Datum DATE, 
	--Uhrzeit
		Beginn TIME,
		Ende TIME,
	CONSTRAINT fkpflegeeinsatzMNr FOREIGN KEY (MNr) REFERENCES tourenplanung (MNr),
	CONSTRAINT fkpflegeeinsatzPNr FOREIGN KEY (PNr) REFERENCES tourenplanung (PNr),
	CONSTRAINT fkpflegeeinsatzPLNr FOREIGN KEY (PLNr) REFERENCES pflegeleistungen (PLNr)
);

CREATE TABLE abrechnung(
	ANr SERIAL PRIMARY KEY,
	PENr SERIAL,
 	Datum DATE, 
	Gesamtkosten NUMERIC(10,2),
	CONSTRAINT fkabrechnungPENr FOREIGN KEY (PENr) REFERENCES pflegeeinsatz (PENr)
);

CREATE TABLE evaluieren(
	ENr  SERIAL PRIMARY KEY,
	EkNr SERIAL, 
	MNr SERIAL, 
	PNr SERIAL, 
	PENr SERIAL,
	Bewertung NUMERIC(3) -- Bewertung in %
	,
	CONSTRAINT fkevaluierenEkNr FOREIGN KEY (EkNr) REFERENCES evaluationskatalog (EkNr),
	CONSTRAINT fkevaluierenMNr FOREIGN KEY (MNr) REFERENCES mitarbeiter (MNr),
	CONSTRAINT fkevaluierenPNr FOREIGN KEY (PNr) REFERENCES patient (PNr),
	CONSTRAINT fkevaluierenPENr FOREIGN KEY (PENr) REFERENCES pflegeeinsatz (PENr)
);