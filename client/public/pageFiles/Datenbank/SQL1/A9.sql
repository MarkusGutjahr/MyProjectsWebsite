SELECT h.HNr, h.HName, SUM(r.Dauer) AS VerbrachteNächte, SUM(r.Kosten)/SUM(r.Dauer) AS KostenProNacht
FROM hotel h JOIN reisen r ON (h.HNr = r.Hotel)
GROUP BY h.HNr, r.Hotel, r.Kosten
ORDER BY h.HNr ASC
;