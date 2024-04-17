SELECT p.ProjektName, COUNT(pm.PNr)
FROM projekt p JOIN projektmitarbeit pm USING (ProjektNr)
GROUP BY p.ProjektName
;