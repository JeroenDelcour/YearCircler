<?php
try {
	$conn = new PDO('mysql:host=localhost;dbname=yearclock', 'root', '');

	$stmt = $conn->prepare('DELETE FROM events WHERE id = :id');
	$stmt->bindParam(':id', $_POST['id']);
	$stmt->execute();

	echo "Deleted " . $stmt->rowCount() . " event(s).";
}
catch(PDOException $e) {
	echo 'Error: ' . $e->getMessage();
}
?>