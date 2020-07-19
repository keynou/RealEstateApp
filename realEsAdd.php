<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
    // $mysqli = new mysqli("cs-server.usc.edu:1111", "noury", "6389", "db1");
	//$myPDO = new PDO('mysql:host=cs-server.usc.edu:1111;dbname=db1', 'user', '');
	//$result = $myPDO->query("SELECT name, age FROM tb1");
//----with PDO----------------------------------

	$host = 'localhost';
	$dbName = 'realEstateQueries';
	$username = 'root';
	$password = '6389';
	 
	$dbCon = new PDO("mysql:host=".$host.";dbname=".$dbName, $username, $password);
	
	//insert
	//$sql = 'INSERT INTO tb1(name,age) VALUES(?,?)';
	//$stmt = $dbCon->prepare($sql);
	//$stmt->execute(array('Ham',"45"));
	//$stmt->execute(array('Jack',"41"));
	date_default_timezone_set('America/Los_Angeles');
	$sql = "INSERT INTO searched (IP, time, address,city, state) VALUES ('".gethostbyaddr($_SERVER['REMOTE_ADDR'])."','".date('l-d-M-Y H:i:s', time())."','".$_GET['str']."', '".$_GET['cit']."', '".$_GET['sta']."')";
	$stmt = $dbCon->prepare($sql);
	$stmt->execute();
	
	
	$sqlCount = "SELECT count(*) FROM searched WHERE IP='".gethostbyaddr($_SERVER['REMOTE_ADDR'])."'";
	$stmt = $dbCon->prepare($sqlCount);
	$stmt->execute();
	$count = $stmt->fetch();
	$sql = "SELECT * FROM searched WHERE IP='".gethostbyaddr($_SERVER['REMOTE_ADDR'])."' ORDER BY time DESC LIMIT 5";
	$stmt = $dbCon->prepare($sql);
	$stmt->execute();
	$phpJsn = '{"count":'.min($count[0],5).',"queries":[';
	for ($i = 0;$i< min($count[0],5)-1 ;$i++){
		$row = $stmt->fetch();
		$phpJsn .= '{"Time":"'.$row[1].'",'.'"Address":"'.$row[2].'",'.'"City":"'.$row[3].'",'.'"State":"'.$row[4].'"},';
	}
	$row = $stmt->fetch();
	$phpJsn .= '{"Time":"'.$row[1].'",'.'"Address":"'.$row[2].'",'.'"City":"'.$row[3].'",'.'"State":"'.$row[4].'"}]}';

	echo $_GET['callback']."(".json_encode($phpJsn).");";
	//$result = $mysqli->query("SELECT lastname FROM employees");
?>