CREATE TABLE film (
    idFilm INTEGER,
    Titel VARCHAR(50),
    Erscheinungsjahr INTEGER,
    Laufzeit TIME,
    CONSTRAINT pkfilm PRIMARY KEY (idFilm)
);

CREATE TABLE filiale(
    idFiliale INTEGER,
    Name VARCHAR(50),
    Stadt VARCHAR(50),
    CONSTRAINT pkfiliale PRIMARY KEY (idFiliale)
);

CREATE TABLE kunde(
    idKunde INTEGER,
    Vorname VARCHAR(50),
    Nachname VARCHAR(50),
    Email VARCHAR(50),
    CONSTRAINT pkkunde PRIMARY KEY (idKunde)
);

CREATE TABLE filialehatfilme(
    fi_idFiliale INTEGER,
    f_idFilm INTEGER,
    Stueckzahl INTEGER,
    CONSTRAINT pkfilialehatfilme PRIMARY KEY (fi_idFiliale, f_idFilm),
    CONSTRAINT fkfilialefilialehatfilme FOREIGN KEY (fi_idFiliale) REFERENCES filiale (idFiliale),
    CONSTRAINT fkfilmfilialehatfilme FOREIGN KEY (f_idFilm) REFERENCES film (idFilm)
);

CREATE TABLE verleih(
    k_idKunde INTEGER,
    fihf_idFiliale INTEGER,
    fihf_idFilm INTEGER,
    Verleihdatum DATE,
    CONSTRAINT pkverleih PRIMARY KEY (k_idKunde, fihf_idFiliale, fihf_idFilm),
    CONSTRAINT fkkundeverleih FOREIGN KEY (k_idKunde) REFERENCES kunde (idKunde),
    CONSTRAINT fkfilialehatfilmeverleih FOREIGN KEY (fihf_idFiliale, fihf_idFilm) REFERENCES filialehatfilme(fi_idFiliale, f_idFilm) 
);