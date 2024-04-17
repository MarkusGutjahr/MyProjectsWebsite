SELECT p.ProjektName, p.Budget AS ursprünglichesBudget, p.Budget * 1.04 AS neusesBudget
FROM projekt p
WHERE p.Beginndatum >= '2016-01-01' AND p.Beginndatum < '2017-01-01' 

UNION

SELECT p.ProjektName, p.Budget AS ursprünglichesBudget, p.Budget * 1.08 AS neusesBudget
FROM projekt p
WHERE p.ProjektName = 'Mobile Business Intelligence' 
ORDER BY ProjektName
;