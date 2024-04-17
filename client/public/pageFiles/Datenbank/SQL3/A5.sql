CREATE VIEW anzFilme(fiName, fiStadt, countFilme) AS(
SELECT fi.Name, fi.Stadt, COUNT(fihf.f_idFilm)
FROM filiale fi JOIN filialehatfilme fihf ON (idFiliale = fi_idFiliale)
GROUP BY fi.Name, fi.Stadt	
);

SELECT fiName, fiStadt, countFilme
FROM anzFilme
WHERE countFilme = (SELECT MAX(countFilme)
				 FROM anzFilme)
GROUP BY fiName, fiStadt, countFilme
;