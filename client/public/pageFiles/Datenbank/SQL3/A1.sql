SELECT f.Titel, EXTRACT(EPOCH FROM f.Laufzeit)/60 AS Länge
FROM film f
WHERE f.Erscheinungsjahr > 1980
ORDER BY f.Titel ASC
;