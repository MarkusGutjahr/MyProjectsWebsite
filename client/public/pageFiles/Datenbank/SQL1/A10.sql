SELECT COUNT(h.HNr) AS UngebuchteHotels
FROM hotel h LEFT JOIN reisen r ON (h.HNr = r.Hotel)
WHERE r.Hotel IS NULL
;