SELECT f.Titel, fi.Name, fi.Stadt, fihf.Stueckzahl
FROM film f JOIN filialehatfilme fihf ON (idFilm = f_idFilm)
            JOIN filiale fi ON (idFiliale = fi_idFiliale)
            JOIN verleih v ON (f_idFilm = fihf_idFilm)
GROUP BY f.Titel, fi.Name, fi.Stadt, fihf.Stueckzahl
HAVING fihf.Stueckzahl = COUNT(v.Verleihdatum)
ORDER BY f.Titel ASC
;