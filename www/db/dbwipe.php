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

try
{
	//delete member
	$sqlQuery = "DELETE FROM `19FS_DBM17TZ_WEBP_Gruppenspiele_team`";
	if (!$db->query($sqlQuery)) {
		echo "{'error': 'wiping table team: " . $db->error . "}";
	}
} catch (PDOException $ex) {
	http_response_code(406);
	echo "{'error': 'SQL: " . $ex->getMessage() . "', 'query': '" . $sqlQuery . "'}";
	die(); //end of script
}
try
{
	//delete member
	$sqlQuery = "DELETE FROM `19FS_DBM17TZ_WEBP_Gruppenspiele_begegnung`";
	if ($db->query($sqlQuery)) {
		echo "{'error': 'OK'}";
	} else {
		echo "{'error': 'wiping table begegnung: " . $db->error . "}";
	}
} catch (PDOException $ex) {
	http_response_code(406);
	echo "{'error': 'SQL: " . $ex->getMessage() . "', 'query': '" . $sqlQuery . "'}";
	die(); //end of script
}
?>
