SELECT h.HNr, h.HName
FROM hotel h JOIN reisen r ON (h.HNr = r.Hotel)
GROUP BY h.HName, h.HNr
HAVING COUNT(r.Hotel) > 1
;