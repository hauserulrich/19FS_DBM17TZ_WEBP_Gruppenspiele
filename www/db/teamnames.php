<?php
require_once "server.php";

//exception handling for PDO
try
{
	//connect
	$db = new PDO("mysql:host=$db_server;dbname=$db_name;charset=utf8", $db_user, $db_pw,
		array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
	//sql request
	$sql_reply = $db->query('SELECT name FROM 19FS_DBM17TZ_WEBP_Gruppenspiele_team');
	$db_data = $sql_reply->fetchAll(PDO::FETCH_ASSOC);
	$js_data = array();
	//prepare response
	foreach ($db_data as $value) {
		array_push($js_data, $value["name"]);
	}
	$json = json_encode($js_data);
	echo $json;
} catch (PDOException $ex) {
	http_response_code(406);
	echo "{'error': 'SQL: " . $ex->getMessage() . "'}";
}
?>
