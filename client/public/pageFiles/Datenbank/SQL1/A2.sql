SELECT m.PNr, m.Name, m.Gehalt
FROM mitarbeiter m
WHERE m.Gehalt = (SELECT MIN(m.Gehalt)
				 FROM mitarbeiter m);