SELECT fi.name, fi.Stadt, f.Titel, fihf.Stueckzahl - Count(v.Verleihdatum)
FROM filiale fi JOIN filialehatfilme fihf ON (idFiliale = fi_idFiliale)
				JOIN verleih v ON (f_idFilm = fihf_idFilm)
				JOIN film f ON (f_idFilm = idFilm)
GROUP BY fihf.fi_idFiliale, fi.name, fi.Stadt, f.Titel, fihf.Stueckzahl
ORDER BY fi.name ASC, fihf.Stueckzahl DESC
;