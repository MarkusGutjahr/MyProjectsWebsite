SELECT fihf.f_idFilm, f.Titel
FROM film f JOIN filialehatfilme fihf ON (f.idFilm = fihf.f_idFilm)
WHERE fihf.f_idFilm NOT in (SELECT fihf.f_idFilm
						   FROM filialehatfilme fihf
						   WHERE fihf.fi_idFiliale = 2)
GROUP BY f.Titel, fihf.f_idFilm
ORDER BY fihf.f_idFilm ASC
;