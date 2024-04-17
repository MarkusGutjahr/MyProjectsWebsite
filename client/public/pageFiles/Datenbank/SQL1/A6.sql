SELECT m.name, m.PNr, a.AbtName, r.Kosten, r.Beginndatum
FROM reisen r JOIN mitarbeiter m ON (r.Mitarbeiter = m.PNr)
JOIN abteilung a USING (AbtNr)
WHERE r.Kosten = (SELECT MAX(r.Kosten)
				 FROM reisen r);