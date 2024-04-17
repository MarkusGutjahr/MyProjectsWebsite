SELECT k.Nachname, k.Vorname, COUNT(DISTINCT v.fihf_idFiliale)
FROM kunde k JOIN verleih v ON (idKunde = k_idKunde) 
GROUP BY k.Nachname, k.Vorname
HAVING COUNT(DISTINCT v.fihf_idFiliale) > 1
ORDER BY k.Nachname, k.Vorname ASC
;