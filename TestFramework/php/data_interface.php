<?php
echo "{
	identifier: 'id',
	label: 'testid',
	items: [";
	
$recsarr=array("sph_ifs_master_dark","sph_ifs_master_detector_flat");
mysql_connect("localhost","root","qso0957+561");
$reccount = 0;
foreach ($recsarr as $val) {
	$reccount = $reccount + 1;
	echo "{ id: 'reccat".$reccount."', name: '".$val."', testid: '".$val."', type: 'recipe', children: [ ";
	$cc = 0;
	if ( mysql_select_db("sphere_test") == false) {
		echo "Could not connect!";
		exit();
	}
	$result = mysql_query("SELECT * from tests WHERE recipe='".$val."'");
	while ($testc = mysql_fetch_array($result)) {
		echo "{ _reference: '".$testc['id']."'}";
		$cc = $cc + 1;
		if ( $cc < mysql_num_rows($result) ) {
			echo ",";
		}
	}
	echo "]}";
	echo ",";
}
$result = mysql_query("SELECT * from tests WHERE 1");
$cc = 0;
while ($testc = mysql_fetch_array($result)) {
	$cc = $cc + 1;
	echo "{ id: '".$testc['id']."', name: '".$testc['name']."', testid: '".$testc['testid']."', recipe: '".$testc['recipe']."' }";
	if ( $cc < mysql_num_rows($result) ) {
		echo ",";
	}
}

echo "]}";
?>
