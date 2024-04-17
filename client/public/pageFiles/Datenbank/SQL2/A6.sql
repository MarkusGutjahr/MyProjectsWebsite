SELECT p.ProjektName
FROM projekt p JOIN projektmitarbeit pm USING (ProjektNr)
WHERE pm.Taetigkeit != 'Projektleiter' 
GROUP BY p.ProjektName
HAVING COUNT(pm.Taetigkeit) >= 1
;