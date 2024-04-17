SELECT m.Name
FROM mitarbeiter m JOIN projektmitarbeit pm USING (PNr) 
					JOIN projekt p USING (ProjektNr)
WHERE m.Abteilung = 'IT-Anwendungen' AND p.ProjektName = 'Mobile Business Intelligence'
;