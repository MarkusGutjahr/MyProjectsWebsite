SELECT m.Name
FROM hotel h
JOIN reisen r ON h.Hnr = r.Hotel
JOIN mitarbeiter m ON m.PNr = r.Mitarbeiter
WHERE h.Ort = 'Hamburg'
GROUP BY m.PNr