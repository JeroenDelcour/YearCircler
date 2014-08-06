<?php
/*
$con=mysqli_connect("localhost:3306","root","","yearclock");
if (mysqli_connect_errno()) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
};

$sql="INSERT INTO events (name, start, end) VALUES ('$_POST[name]','$_POST[start]','$_POST[end]')";

$result=mysql_query($sql);

if (!mysqli_query($con,$sql)) {
	die('Error: ' . mysqli_error($con));
};
echo "1 event added";
mysqli_close($con);
*/

// now let's try that the PDO way
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