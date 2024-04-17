SELECT k.Nachname, k.Vorname, k.Email, f.Titel, fi.Name, fi.Stadt, 
		(SUM(EXTRACT( YEAR FROM age(CURRENT_DATE, v.Verleihdatum)) * 365 +
			EXTRACT( MONTH FROM  age(CURRENT_DATE, v.Verleihdatum)) * 30 +
			EXTRACT( DAY FROM age(CURRENT_DATE, v.Verleihdatum))
		) - 7) * 0.8 AS Strafgebuehr
FROM kunde k JOIN verleih v ON (idKunde = k_idKunde)
				JOIN filiale fi ON (fihf_idFiliale = idFiliale)
				JOIN film f ON (fihf_idFilm = idFilm)
GROUP BY k.Nachname, k.Vorname, k.Email, f.Titel, fi.Name, fi.Stadt,
			v.Verleihdatum
HAVING (SUM(EXTRACT( YEAR FROM age(CURRENT_DATE, v.Verleihdatum)) * 365 +
			EXTRACT( MONTH FROM  age(CURRENT_DATE, v.Verleihdatum)) * 30 +
			EXTRACT( DAY FROM age(CURRENT_DATE, v.Verleihdatum))
		) - 7) > 0
ORDER BY k.Nachname, k.Vorname ASC, Strafgebuehr DESC
;