<!DOCTYPE html>

<html lang="en">
<head>
	<title>Year clock</title>
	<meta charset="utf-8">
	<meta name="author" content="Jeroen Delcour">
	<link rel="shortcut icon" href="images/favicon.ico">
	<link href='style.css' rel='stylesheet' type='text/css'>
	<script src="clock.js"></script>
</head>
<body>

<div id="clock"></div>

<script>
	var year = new Date().getFullYear();
	init(document.getElementById("clock"), year); // initialize clock, passing SVG and def elements names as arguments
</script>
</body>
</html>