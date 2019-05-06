<?php
require_once "server.php";

//return format error
//error element: table entry causing the error (missing or format problem)
function sendFormatError($error_element) {
	http_response_code(404);
	echo "error in parameters: " . $error_element;
	die(); //end of script
}

//test, if a parameter exists
function testParameter($paramName) {
	if (!array_key_exists($paramName, $_GET)) {
		sendFormatError($paramName);
	}
}

//test all parameters for existence
function testGet() {
	$parameters = ["team1_id", "team2_id", "punkte_team1", "punkte_team2"];
	foreach ($parameters as $parameter) {
		testParameter($parameter);
	}
}

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

testGet();

$team1_id = $_GET['team1_id'];
$team2_id = $_GET['team2_id'];
$punkte_team1 = $_GET['punkte_team1'];
$punkte_team2 = $_GET['punkte_team2'];

try
{
	//new member
	$sqlQuery = "INSERT INTO `19FS_DBM17TZ_WEBP_Gruppenspiele_begegnung` (`id`, `team1_id`, `team2_id`, `punkte_team1`, `punkte_team2`) VALUES (NULL, '$team1_id', '$team2_id', '$punkte_team1', '$punkte_team2')";
	$db->query($sqlQuery);
	if (null !== $db->lastInsertId()) {
		$json = "{\"id\":" . $db->lastInsertId() . "}";
		echo $json;
	}

} catch (PDOException $ex) {
	http_response_code(406);
	echo "{'error': 'SQL: " . $ex->getMessage() . "', 'query': '" . $sqlQuery . "'}";
	die(); //end of script
}
?>
