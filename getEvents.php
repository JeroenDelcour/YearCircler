<?php
$data = array();

try {
	$conn = new PDO('mysql:host=localhost;dbname=yearclock', 'root', '');
	
	$stmt = $conn->prepare("SELECT * FROM events WHERE end < '2014-10-01' AND end >= '2014-07-01' ORDER BY start DESC");
	$stmt->execute();
	$result1 = $stmt->fetchAll();
	$stmt = $conn->prepare("SELECT * FROM events WHERE end < '2014-07-01' AND end >= '2014-04-01' ORDER BY start ASC");
	$stmt->execute();
	$result2 = $stmt->fetchAll();
	$stmt = $conn->prepare("SELECT * FROM events WHERE end < '2015-01-01' AND end >= '2014-10-01' ORDER BY start ASC");
	$stmt->execute();
	$result3 = $stmt->fetchAll();
	$stmt = $conn->prepare("SELECT * FROM events WHERE end < '2014-04-01' AND end >= '2014-01-01' ORDER BY start DESC");
	$stmt->execute();
	$result4 = $stmt->fetchAll();

	foreach($result1 as $row) {
		$data[] = addToArray($row);
	}
	foreach($result2 as $row) {
		$data[] = addToArray($row);
	}
	foreach($result3 as $row) {
		$data[] = addToArray($row);
	}
	foreach($result4 as $row) {
		$data[] = addToArray($row);
	}
} catch(PDOException $e) {
	echo 'ERROR: ' . $e->getMessage();
}

function addToArray($row) {
	preg_match('/(\d{4})-(\d{2})-(\d{2})/',$row['start'], $startMatches);
	preg_match('/(\d{4})-(\d{2})-(\d{2})/',$row['end'], $endMatches);
	$entry = array(
		"id" => $row['id'],
		"name" => $row['name'],
		"start" => array(
			"year" => (int) $startMatches[1],
			"month" => (int) $startMatches[2], 
			"day" => (int) $startMatches[3]),
		"end" => array(
			"year" => (int) $endMatches[1],
			"month" => (int) $endMatches[2], 
			"day" => (int) $endMatches[3])
	);
	return $entry;
};

$events = json_encode($data);
?>