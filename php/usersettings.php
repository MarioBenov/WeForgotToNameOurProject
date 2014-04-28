<?php

$user_id = $_GET['user_id'];

$toClose = mysql_connect("localhost", "ut", "4FEnz7xrHC");
mysql_select_db("ut");

$sql = mysql_query("SELECT MyModules.Name, MyModules.Title, MyModules.MainWidget FROM MyModules INNER JOIN MU ON MU.Module_ID = MyModules.Module_ID WHERE MU.User_ID = ".$user_id."");
$RES = [];

while ($row = mysql_fetch_assoc($sql)) {
    array_push($RES, $row);
 }

header('Access-Control-Allow-Origin: *', true); 
header('Content-Type: application/json; charset=utf-8', true); 
echo json_encode($RES);
mysql_close($toClose);

?>
