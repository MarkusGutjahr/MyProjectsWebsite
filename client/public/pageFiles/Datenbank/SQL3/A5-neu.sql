SELECT fiName, fiStadt, countFilm
FROM (SELECT fi.Name AS fiName, fi.Stadt AS fiStadt, COUNT(f_idFilm) AS countFilm
	 FROM filiale fi JOIN filialehatfilme fihf ON (idFiliale = fi_idFiliale)
	 GROUP BY fi.Name, fi.Stadt) AS test
	 
WHERE countFilm in (SELECT MAX(countFilm)
				   FROM (SELECT fi.Name AS fiName, fi.Stadt AS fiStadt, COUNT(f_idFilm) AS countFilm
	 FROM filiale fi JOIN filialehatfilme fihf ON (idFiliale = fi_idFiliale)
	 GROUP BY fi.Name, fi.Stadt) AS test)
	 	 
GROUP BY fiName, fiStadt, countFilm
;