SELECT h.HNr, h.HName, h.Kategorie, h.PLZ, h.Ort
FROM hotel h
WHERE h.HName LIKE '%City%'
AND PLZ >= 50000 AND PLZ <= 60000;