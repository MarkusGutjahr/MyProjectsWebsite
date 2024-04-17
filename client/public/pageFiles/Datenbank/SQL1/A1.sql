SELECT m.pnr, m.name 
FROM mitarbeiter m JOIN abteilung a USING (AbtNr)
WHERE a.AbtName = 'Softwareentwicklung'
ORDER BY m.pnr ASC;