<!DOCTYPE html>

<html lang="en">
<head>
	<title>YearCircler - Intuitive calendar and year planner</title>
	<meta charset="utf-8">
	<meta name="author" content="Jeroen Delcour">
	<meta name="description" content="An intuitive way to organize your year.">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400' rel='stylesheet' type='text/css'>
	<link rel="shortcut icon" href="favicon.ico">
	<style>
		@-webkit-viewport{width:620px}
		@-moz-viewport{width:620px}
		@-ms-viewport{width:620px}
		@-o-viewport{width:620px}
		@viewport{width:620px}
		body {
			font-family: 'Open Sans', sans-serif;
			font-size: 0.8em;
			height: 100%;
			width: 100%;
			position: absolute;
			padding: 0px;
			margin: 0px;
			zoom: 1;
		}
		#main {
			height: 100%;
		}
		#wrapper {
			display: block;
			position: relative;
			top: 50%;
			-ms-transform: translateY(-50%);
			-webkit-transform: translateY(-50%);
			transform: translateY(-50%);
			margin-left: auto;
			margin-right: auto;
		}
		h1 {
			text-align: center;
		}
		#wrapper p {
			text-align: center;
		}
		#releaseNote {
			text-align: center;
			position: relative;
			margin-top: 4em;
		}
		.logo {
			margin-left: auto;
			margin-right: auto;
			display: block;
		}
		.mail {
			text-align: center;
			display: block;
			margin-top: 4em;
		}
	</style>
</head>
<body>
<?php include_once("analyticstracking.php") ?>

<div id="main">
	<div id="wrapper">
		<img class="logo" src="logo2big.png" alt="Year Circler - year planner"/>
		
		<h1>The yearly organizer.</h1>
		
		<h1>Intuitively plan your important events for the year.</h1>
		
		<p id="releaseNote">Soon to be released.</p>
		
		<a class="mail" href="mailto:contact@yearcircler.com">contact@yearcircler.com</a>
	</div>
</div>

</body>
</html>