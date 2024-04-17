DELIMITER //
CREATE PROCEDURE abrGesKost (IN ANr INTEGER, OUT a_Gesamtkosten DECIMAL(10,2))
BEGIN

	DECLARE a_Gesamtkosten DECIMAL(10,2) DEFAULT 0;
	
	SET a_Gesamtkosten = (SELECT SUM(pl.pl_Kosten)
						  FROM Abrechnung a JOIN Abrechnungspos ap ON (ANR = ap_ANr)
 					  						JOIN Pflegeeinsatz pe ON (ap_PENr = PENr)
					  						JOIN PFlegeleistungen pl ON (pe_PLNr = PLNr)
						  WHERE ap.ap_ANr = a.ANR) AS gesKostenErfassung;
END //
DELIMITER ;