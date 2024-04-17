SELECT p.ProjektName, 'Groesstes Budget' AS Budget
FROM projekt p
WHERE p.Budget IN (
    SELECT MAX(p.Budget)
    FROM projekt p
)
UNION
SELECT p.ProjektName, 'Kleinstes Budget' AS Budget
FROM projekt p
WHERE p.Budget IN (
    SELECT MIN(p.Budget)
    FROM projekt p
);