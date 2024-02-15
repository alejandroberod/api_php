<?php

$host = "localhost";
$user = "root";
$password = "";
$myDB = "apisena";
$data = array();
$mysqli = new mysqli($host, $user, $password, $myDB);

if ($mysqli->connect_error) {
  echo ("Faild to connect " . $mysqli->connect_error);
} else {
  //echo("Connect OK");
}

$query = "CALL sp_select_all_user()";

$result = $mysqli->query($query);

while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}
$result->free_result();
$mysqli->close();

echo json_encode($data);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type");