<?php
$val=$_GET['testid'];

mysql_connect("localhost","root","qso0957+561");

if ( mysql_select_db("sphere_test") == false) {
	echo "Could not connect!";
	exit();
}
$result = mysql_query("SELECT * from tests WHERE testid='".$val."'");


$testc = mysql_fetch_array($result);
//
$resstring = "";

if ($testc) {
	$resultarr['testid'] = $testc['testid'];	
	$resultarr['recipe'] = $testc['recipe'];	
	$resultarr['version'] = $testc['version'];	
	$resultarr['responsible'] = $testc['responsible'];
	$resultarr['getmail'] = $testc['getmail'];
	$resultarr['date'] = $testc['date'];
	$resultarr['description'] = $testc['description'];
}

$resstring = json_encode($resultarr);
echo $resstring;
?>
