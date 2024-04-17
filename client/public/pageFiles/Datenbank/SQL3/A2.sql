SELECT f.Titel, f.Erscheinungsjahr
FROM film f JOIN filialehatfilme fhf ON (f.idFilm = f_idFilm) JOIN verleih v ON (fhf.f_idFilm = fihf_idFilm)
WHERE f.Erscheinungsjahr < 1992 
	AND v.Verleihdatum > '2021-01-01'
GROUP BY f.Titel, f.Erscheinungsjahr
HAVING COUNT(v.Verleihdatum) < 3
ORDER BY f.Titel ASC
;