SELECT m.name, m.PNr, COUNT(r.Mitarbeiter) /*as AnzahlDerReisen*/,
	ROUND(CAST(AVG(r.Kosten) AS NUMERIC), 2) /*as Durchschnittskosten*/
FROM mitarbeiter m JOIN reisen r ON (m.PNr = r.Mitarbeiter)
GROUP BY m.name, m.PNr
ORDER BY m.name DESC;