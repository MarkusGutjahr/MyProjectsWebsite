SELECT p.ProjektName, m.Name, pm.Taetigkeit
FROM projekt p JOIN projektmitarbeit pm USING (ProjektNr)
				JOIN mitarbeiter m USING (PNR) 
ORDER BY p.ProjektName, m.Name ASC
;