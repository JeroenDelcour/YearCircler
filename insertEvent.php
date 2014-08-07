<?php
try {
	$conn = new PDO('mysql:host=localhost;dbname=yearclock', 'root', '');

	$stmt = $conn->prepare('INSERT INTO events (name, start, end) VALUES(:name, :start, :end)');
	$stmt->execute(array(
	':name' => $_POST['name'],
	':start' => $_POST['start'],
	':end' => $_POST['end']
	));

	# Affected Rows?
	echo "Added event \"" . $_POST['name'] . "\".";
}
catch(PDOException $e) {
	echo 'Error: ' . $e->getMessage();
}
?>