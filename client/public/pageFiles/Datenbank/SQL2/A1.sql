SELECT p.ProjektName, p.Budget
FROM projekt p
WHERE p.Budget >= 175000
ORDER BY p.Budget DESC
;