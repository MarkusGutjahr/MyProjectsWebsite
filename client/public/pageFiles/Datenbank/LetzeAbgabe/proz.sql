DELIMITER //
CREATE PROCEDURE abrGesKost (IN ANr INTEGER, OUT a_Gesamtkosten DECIMAL(10,2))
BEGIN

	DECLARE a_Gesamtkosten DECIMAL(10,2) DEFAULT 0;
	
	SET a_Gesamtkosten = (SELECT SUM((mat.mat_Preis * map_Menge) + (med.med_Preis * mep_Menge))
						  FROM Abrechnung a JOIN Abrechnungspos ap ON (ANR = ap_ANr)
 					  						JOIN Pflegeeinsatz pe ON (ap_PENr = PENr)
					  						JOIN Pflegeleistungen pl ON (pe_PLNr = PLNr)
						  					JOIN Materialpos map ON (PLNr = map_PLNr)
						  					JOIN Materialien mat ON (map_MatNr = MatNr)
						  					JOIN Medizinpos mep ON (PLNR = mep_PLNr)
						  					JOIN Medizin med ON (mep_MedNr = MedNr)
						  WHERE a.ANr = ANR) AS gesKostenErfassung;
END //
DELIMITER ;



-- Alte
/*
DELIMITER //
CREATE PROCEDURE abrGesKost (IN ANr INTEGER, OUT a_Gesamtkosten DECIMAL(10,2))
BEGIN

	DECLARE a_Gesamtkosten DECIMAL(10,2) DEFAULT 0;
	
	SET a_Gesamtkosten = (SELECT SUM(pl.pl_Kosten)
						  FROM Abrechnung a JOIN Abrechnungspos ap ON (ANR = ap_ANr)
 					  						JOIN Pflegeeinsatz pe ON (ap_PENr = PENr)
					  						JOIN Pflegeleistungen pl ON (pe_PLNr = PLNr)
						  WHERE ap.ap_ANr = ANR) AS gesKostenErfassung;
END //
DELIMITER ;
*/