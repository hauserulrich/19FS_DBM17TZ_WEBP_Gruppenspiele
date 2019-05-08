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
	$parameters = ["id"];
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

$id = $_GET['id'];

try
{
	//new member
	$sqlQuery = "SELECT * FROM `19FS_DBM17TZ_WEBP_Gruppenspiele_begegnung` WHERE team1_id='$id' OR team2_id='$id'";
	$sql_reply = $db->query($sqlQuery);
	$db_data = $sql_reply->fetchAll(PDO::FETCH_ASSOC);
	$json = json_encode($db_data);
	echo $json;
} catch (PDOException $ex) {
	http_response_code(406);
	echo "{'error': 'SQL: " . $ex->getMessage() . "'}";
}
?>
