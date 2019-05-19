<?php
require_once "server.php";

try
{
	//connect
	$db = new PDO("mysql:host=$db_server;dbname=$db_name;charset=utf8", $db_user, $db_pw,
		array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
} catch (PDOException $ex) {
	http_response_code(406);
	echo "{'error': 'connecting to db $dbname on $db_server failed'}";
	die(); //end of script
}

$teams = ["FC Augsburg", "HertaBSC", "Werder Bremen", "Borussia Dortmund", "Fortuna Duesseldorf", "Eintracht Frankfurt", "SC Freiburg", "Hannover 96", "TSG 1899 Hoffenheim", "RB Leipzig", "Bayer 04 Leverkusen", "1. FSV Mainz 05", "Borussia Mönchengladbach", "FC Bayern München", "1. FC Nuernberg", "FC Schalke 04", "VfB Stuttgart", "Vfl Wolfsburg"];
$json = "[";
foreach ($teams as $key => $value) {
	try
	{
        // intdiv um die teams in gruppen nicht groesser als 4 zu verteilen
		$group = intdiv($key, 4);
		$sqlQuery = "INSERT INTO `19FS_DBM17TZ_WEBP_Gruppenspiele_team` (`id`, `name`, `gruppen_id`) VALUES (NULL, '$value', '$group')";
		$db->query($sqlQuery);
		if (null !== $db->lastInsertId()) {
			if (0 != $key) {
				$json = $json . ",";
			}
			$json = $json . "{\"id\":" . $db->lastInsertId() . "}";
		}

	} catch (PDOException $ex) {
		http_response_code(406);
		echo "{'error': 'SQL: " . $ex->getMessage() . "', 'query': '" . $sqlQuery . "'}";
		die(); //end of script
	}
}
$json = $json . "]";
echo $json;
?>
