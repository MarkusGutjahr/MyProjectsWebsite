CREATE TABLE evaluationskatalog(
	EkNr INTEGER, 
	ek_Beschreibung VARCHAR(100),
	CONSTRAINT pkevaluationskatalog PRIMARY KEY (EkNr)
);

CREATE TABLE firmenfahrzeug(
	Kennzeichen VARCHAR(8),
 	f_Kilometerstand DECIMAL(7,1),
	f_TUEV DATE,
	f_Reparaturen VARCHAR(200),
	CONSTRAINT pkfirmenfahrzeug PRIMARY KEY (Kennzeichen)
);

CREATE TABLE mitarbeiter(
	MNr INTEGER, 
	m_Name VARCHAR(30), 
	m_Vorname VARCHAR(30), 
	m_Geburtsdatum DATE, 
	m_Anschrift VARCHAR(100),
	m_PLZ DECIMAL(5,0),
	m_Stadt VARCHAR(40),
	CONSTRAINT pkmitarbeiter PRIMARY KEY (MNr)
);

CREATE TABLE krankenkasse(
	KNr INTEGER, 
	k_Name VARCHAR(30), 
	k_Art VARCHAR(20),
	CONSTRAINT pkkrankenkasse PRIMARY KEY (KNr)
);

CREATE TABLE pflegeleistungen(
	PLNr INTEGER, 
	pl_Name VARCHAR(30), 
	pl_Dauer TIME,
	pl_Kosten float8, 
	pl_Beschreibung VARCHAR(200), 
	pl_Anwendungsfall VARCHAR(100), 
	pl_Materialien VARCHAR(200),
	CONSTRAINT pkpflegeleistungen PRIMARY KEY (PLNr)
);

CREATE TABLE fahrzeugvergabe(
	fg_Kennzeichen VARCHAR(8), 
	fg_MNr INTEGER,
	CONSTRAINT pkfahrzeugvergabe PRIMARY KEY (fg_Kennzeichen, fg_MNr),
	CONSTRAINT fkfahrzeugvergabeKennzeichen FOREIGN KEY (fg_Kennzeichen) REFERENCES firmenfahrzeug (Kennzeichen),
	CONSTRAINT fkfahrzeugvergabeMNr FOREIGN KEY (fg_MNr) REFERENCES mitarbeiter (MNr)
);

CREATE TABLE patient(
	PNr INTEGER, 
	pat_KNr INTEGER,
	pat_Name VARCHAR(30), 
	pat_Vorname VARCHAR(30), 
	pat_Geburtsdatum DATE, 
	pat_Anschrift VARCHAR(100),
	pat_PLZ DECIMAL(5,0),
	pat_Stadt VARCHAR(40),
	pat_VersichertenNr VARCHAR(30),
	CONSTRAINT pkpatient PRIMARY KEY (PNr, pat_Anschrift, pat_PLZ, pat_Stadt),
	CONSTRAINT fkpatient FOREIGN KEY (pat_KNr) REFERENCES Krankenkasse (KNr)
);

CREATE TABLE tourenplanung(
	t_MNr INTEGER,  
	t_Datum DATE,
	t_Dauer TIME,
	t_Laenge DECIMAL(4,1),
	CONSTRAINT pktourenplanung PRIMARY KEY (t_MNr, t_Datum),
	CONSTRAINT fktourenplanungMNr FOREIGN KEY (t_MNr) REFERENCES mitarbeiter (MNr)
);

CREATE TABLE tourenpos(
	TPOS INTEGER,
	tp_MNr INTEGER,  
	tp_PNr INTEGER,
	tp_Datum DATE,
	tp_Anschrift VARCHAR(100),
	tp_PLZ DECIMAL(5,0),
	tp_Stadt VARCHAR(40),
	CONSTRAINT pktourenpos PRIMARY KEY (TPOS, tp_MNr, tp_PNr, tp_Datum),
	CONSTRAINT fktourenposMNr FOREIGN KEY (tp_MNr, tp_Datum) REFERENCES tourenplanung (t_MNr, t_Datum),
	CONSTRAINT fktourenposPNr FOREIGN KEY (tp_PNr, tp_Anschrift, tp_PLZ, tp_Stadt) REFERENCES patient (PNr, pat_Anschrift, pat_PLZ, pat_Stadt)
);

CREATE TABLE pflegeeinsatz(
	PENr INTEGER, 
	pe_TPOS INTEGER,
	pe_MNr INTEGER, 
	pe_PNr INTEGER,
	pe_PLNr INTEGER, 
	pe_Datum DATE, 
	--Uhrzeit
		pe_Beginn TIME,
		pe_Ende TIME,
	CONSTRAINT pkpflegeeinsatz PRIMARY KEY (PENr),
	CONSTRAINT fkpflegeeinsatzMNr FOREIGN KEY (pe_TPOS, pe_MNr, pe_PNr, pe_Datum) REFERENCES tourenpos (TPOS, tp_MNr, tp_PNr, tp_Datum),
	CONSTRAINT fkpflegeeinsatzPLNr FOREIGN KEY (pe_PLNr) REFERENCES pflegeleistungen (PLNr)
);

CREATE TABLE abrechnung(
	ANr INTEGER,
 	a_Datum DATE, 
	a_Gesamtkosten DECIMAL(10,2),
	CONSTRAINT pkabrechnung PRIMARY KEY (ANr)
);

CREATE TABLE abrechnungspos(
	APOS INTEGER,
	ap_ANr INTEGER,
	ap_PENr INTEGER,
	CONSTRAINT pkabrechnungspos PRIMARY KEY (APOS, ap_ANr, ap_PENr),
	CONSTRAINT fkabrechnungsposPENr FOREIGN KEY (ap_PENr) REFERENCES pflegeeinsatz (PENr),
	CONSTRAINT fkabrechnungsposANr FOREIGN KEY (ap_ANr) REFERENCES abrechnung (ANr)
);

CREATE TABLE evaluation(
	ENr  INTEGER,
	e_EkNr INTEGER, 
	e_MNr INTEGER, 
	e_PNr INTEGER, 
	e_PENr INTEGER,
	e_Bewertung DECIMAL(3,0) -- Bewertung in %
	,
	e_Anschrift VARCHAR(100),
	e_PLZ DECIMAL(5,0),
	e_Stadt VARCHAR(40),
	CONSTRAINT pkevaluation PRIMARY KEY (ENr),
	CONSTRAINT fkevaluationEkNr FOREIGN KEY (e_EkNr) REFERENCES evaluationskatalog (EkNr),
	CONSTRAINT fkevaluationMNr FOREIGN KEY (e_MNr) REFERENCES mitarbeiter (MNr),
	CONSTRAINT fkevaluationPNr FOREIGN KEY (e_PNr, e_Anschrift, e_PLZ, e_Stadt) REFERENCES patient (PNr, pat_Anschrift, pat_PLZ, pat_Stadt),
	CONSTRAINT fkevaluationPENr FOREIGN KEY (e_PENr) REFERENCES pflegeeinsatz (PENr)
);