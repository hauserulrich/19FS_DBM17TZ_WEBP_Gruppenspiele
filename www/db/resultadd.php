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
    $parameters = ["team1_id", "team2_id"];
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
$teamAdd = false;
if (array_key_exists('punkte_team1', $_GET) || array_key_exists('punkte_team2', $_GET)) {
//add a result
    if (!array_key_exists('punkte_team1', $_GET) || !array_key_exists('punkte_team2', $_GET)) {
        //one team's points are missing
        echo "{'error': 'one team's points are missing'}";
        die();
    } else {
//both team's points present
        $punkte_team1 = $_GET['punkte_team1'];
        $punkte_team2 = $_GET['punkte_team2'];
    }
} else {
    $teamAdd = true;
}
try
{
    if ($teamAdd) {
        //add a new team
        //test for game existence
        $sqlQuery = "SELECT * FROM `19FS_DBM17TZ_WEBP_Gruppenspiele_begegnung` WHERE team1_id = '$team1_id' AND team2_id = '$team2_id'";
        $db_data = $db->query($sqlQuery);
        if ($db_data->rowCount() > 0) {
            //game exists
            http_response_code(406);
            echo "{'error': 'game exists'}";
            die(); //end of script
        } else {
            //game does not exist
            //new member
            $sqlQuery = "INSERT INTO `19FS_DBM17TZ_WEBP_Gruppenspiele_begegnung` (`id`, `team1_id`, `team2_id`, `punkte_team1`, `punkte_team2`) VALUES (NULL, '$team1_id', '$team2_id', '0','0')";
            $db->query($sqlQuery);
            if (null !== $db->lastInsertId()) {
                $json = "{\"id\":" . $db->lastInsertId() . "}";
                echo $json;
            }
        }
    } else {
        //add a result to a given team
        $sqlQuery = "UPDATE `19FS_DBM17TZ_WEBP_Gruppenspiele_begegnung` SET punkte_team1 = '$punkte_team1', punkte_team2 = '$punkte_team2' WHERE team1_id = '$team1_id' AND team2_id = '$team2_id'";
        $db_result = $db->query($sqlQuery);
        if ($db_result->rowCount() > 0) {
            echo "{'error': 'OK'}";
        } else {
            echo "{'error': 'SQL: update of member failed', 'query': '" . $sqlQuery . "'}";
        }
    }
} catch (PDOException $ex) {
    http_response_code(406);
    echo "{'error': 'SQL: " . $ex->getMessage() . "', 'query': '" . $sqlQuery . "'}";
    die(); //end of script
}
?>
