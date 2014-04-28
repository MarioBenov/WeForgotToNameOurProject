<?php

header('Access-Control-Allow-Origin: *', true);
$username = $_POST['userName'];
$password = $_POST['password'];

$toClose = mysql_connect("localhost", "ut", "4FEnz7xrHC");
mysql_select_db("ut");

$sql = mysql_query("SELECT Username, Password FROM User WHERE Username = '".$username."' AND Password = '".$password."'");
$num_rows = mysql_num_rows($sql);

if($num_rows == 0){
	http_response_code(400);
}else{
	session_start();

	if(session_id() == '' || !isset($_SESSION)) {
    	echo "New session";
	}

	echo 'OK';
}

?>