<?php
$data = $_GET['data'];

$toClose = mysql_connect("localhost", "ut", "4FEnz7xrHC");
mysql_select_db("ut");

$sql = mysql_query("SELECT * FROM JunkAcceptors WHERE Title LIKE '%".$data."%'"); 
$RES = [];

while ($row = mysql_fetch_assoc($sql)) {
    array_push($RES, $row);
 }

header('Access-Control-Allow-Origin: *', true); 
header('Content-Type: application/json; charset=utf-8', true); 
echo json_encode($RES);
mysql_close($toClose);
?>