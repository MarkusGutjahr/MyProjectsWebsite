SELECT r1.Mitarbeiter AS PNr1, r2.Mitarbeiter AS PNr2,
h1.HName, r1.Beginndatum
FROM hotel h1 JOIN reisen r1 ON (h1.Hnr = r1.Hotel),
		hotel h2 JOIN reisen r2 ON (h2.Hnr = r2.Hotel)
WHERE r1.Beginndatum = r2.Beginndatum 
	AND r1.Mitarbeiter != r2.Mitarbeiter AND r1.Hotel = r2.Hotel
;