<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$user = "root";
$password = "";
$myDB = "apisena";
$data = array();
$mysqli = new mysqli($host, $user, $password, $myDB);

if ($mysqli->connect_error) {
  echo ("Failed to connect " . $mysqli->connect_error);
} else {
  //echo("Connect OK");
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $postData = json_decode(file_get_contents("php://input"), true);
  $User_user = $postData['User_user'];
  $User_password = $postData['User_password'];
  $User_status_id = $postData['User_status_id'];
  $Role_id = $postData['Role_id'];

  $query = $mysqli->query("INSERT INTO user (User_id, User_user, User_password, User_status_id, Role_id) VALUES (null, '$User_user', '$User_password', $User_status_id, $Role_id)");

} elseif ($_GET['id']) {
  $User_id = $_GET['id'];

  $sql = $mysqli->query("DELETE FROM services WHERE id=$User_id");

} else {
  $query = "CALL sp_select_all_user()";
  $result = $mysqli->query($query);

  while ($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
  $result->free_result();
  echo json_encode($data);
}

$mysqli->close();
?>

