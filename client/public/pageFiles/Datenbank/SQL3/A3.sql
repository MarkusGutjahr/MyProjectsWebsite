SELECT fi.Name, fi.Stadt, f.Titel, COUNT(k_idKunde)
FROM filiale fi JOIN filialehatfilme fhf ON (fi.idFiliale = fi_idFiliale)
				 JOIN film f ON (f.idFilm = fhf.f_idFilm)
				 JOIN verleih h ON (fhf.fi_idFiliale = fihf_idFiliale)
WHERE fhf.f_idFilm = h.fihf_idFilm
GROUP BY fi.Name, f.Titel, fi.Name, fi.Stadt
ORDER BY fi.Name, f.Titel ASC
;