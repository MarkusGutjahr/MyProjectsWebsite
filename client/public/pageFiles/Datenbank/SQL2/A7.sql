SELECT pm.PNr, m.Name, SUM(pm.Stunden)
FROM projekt p JOIN projektmitarbeit pm USING (ProjektNr) JOIN mitarbeiter m USING (PNr)
WHERE pm.Taetigkeit = 'Projektleiter' AND p.Budget > 250000
GROUP BY pm.PNr, m.Name
;