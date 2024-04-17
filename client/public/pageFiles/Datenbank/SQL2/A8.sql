SELECT m.Name
FROM mitarbeiter m 
WHERE m.Name LIKE 'M%' OR m.Name LIKE 'R%'
;