<?php

$title = $_POST['title'];
$desc = $_POST['description'];
$email = $_POST['email'];
$user_id = $_POST['user_id'];

$toClose = mysql_connect("localhost", "ut", "4FEnz7xrHC");
mysql_select_db("ut");

$result = mysql_query("SELECT Title FROM JunkAcceptors WHERE Title = '".$title."'");
$num_rows = mysql_num_rows($result);

header('Access-Control-Allow-Origin: *', true); 

if($num_rows == 0){
	$sql = mysql_query("INSERT INTO JunkAcceptors(Title, Description, Email, User_ID) VALUES ('".$title."', '".$desc."', '".$email."', '".$user_id."')");
	echo 'OK';
}else{
	echo 'Bad';
}

mysql_close($toClose);

?>