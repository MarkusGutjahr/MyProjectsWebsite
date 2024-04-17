ALTER TABLE projekt 
ADD COLUMN BudgetAlsText VARCHAR(50)
default null
;

UPDATE projekt p SET BudgetAlsText = 'Groesstes Budget' WHERE p.Budget = (SELECT MAX(p.Budget)
															  FROM projekt p)
;
UPDATE projekt p SET BudgetAlsText = 'Kleinstes' WHERE p.Budget = (SELECT MIN(p.Budget)
															  FROM projekt p)
;

SELECT p.ProjektName, p.BudgetAlsText
FROM projekt p
WHERE p.Budget =(SELECT MAX(p.Budget) FROM projekt p) OR p.Budget =(SELECT MIN(p.Budget) FROM projekt p)
GROUP BY p.ProjektName, p.BudgetAlsText
;