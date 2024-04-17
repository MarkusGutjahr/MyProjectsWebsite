/*
SELECT SUM(
	EXTRACT( HOUR FROM f.laufzeit)6060 +
	EXTRACT( MINUTE FROM  f.laufzeit)*60 +
	EXTRACT(SECOND FROM f.laufzeit)
	)
FROM film f
;
*/

SELECT EXTRACT(EPOCH FROM SUM(f.Laufzeit) ) 
FROM film f
;