<?php
$con=mysqli_connect("localhost:3306","root","","yearclock");
if (mysqli_connect_errno()) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
};

/*
$begin = new DateTime( '2014-01-07' );
$end = new DateTime( '2014-01-10' );

$interval = DateInterval::createFromDateString('1 day');
$period = new DatePeriod($begin, $interval, $end);
$sql = "INSERT INTO events (name, start, end) VALUES ('blabla','2014-01-01','2014-01-06')";
foreach ( $period as $dt ) {
	$tmp = $dt->format( "Y-m-d" );
	global $sql;
	$sql .= ", ('blabla','$tmp','$tmp')";
};
*/

$sql="INSERT INTO events (name, start, end) VALUES ('$_POST[name]','$_POST[start]','$_POST[end]')";

$result=mysql_query($sql);

if (!mysqli_query($con,$sql)) {
	die('Error: ' . mysqli_error($con));
};
echo "1 event added";
mysqli_close($con);

?>