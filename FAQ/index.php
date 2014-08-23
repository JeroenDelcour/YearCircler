<!DOCTYPE html>

<html lang="en">
<head>
	<title>YearCircler - Intuitive calendar and year planner</title>
	<meta charset="utf-8">
	<meta name="author" content="Jeroen Delcour">
	<meta name="description" content="YearCircler is a yearly organizer to help you intuitively plan your import events for the year.">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400' rel='stylesheet' type='text/css'>
	<link rel="shortcut icon" href="../images/favicon.ico">
	<link href='../header.css' rel='stylesheet' type='text/css'>
	<link href='FAQ.css' rel='stylesheet' type='text/css'>
	<?php
		$bday = new DateTime("1992-03-30");
		$now = new DateTime();
		$interval = $bday->diff($now);
		$age = $interval->y;
	?>
</head>
<body>
<?php // include_once("../analyticstracking.php") ?>

<div class="header">
	<div class="headerLeft">
		<a href="../" class="headerButton">HOME</a>
	</div>
	<div class="headerRight">
		<a href="../FAQ/" class="headerButton">FAQ</a>
	</div>
</div>


	<div id="wrapper">
		<a href="../"><div class="logoBig" alt="Year Circler - year planner"></div></a>
		
		<h2><span>THE ANNUAL ORGANIZER</span></h1>
		
		<div class="description">
		<h3>What is YearCircler?</h3>
<p>It provides a way to organize your future.</p>
<h3>Don’t regular agendas and planners already do that?</h3>
<p>Yes, to a degree. Agendas rarely allow you to look at more than a day at a time, though, or maybe a week. If you’re trying to get an overview of, say, the coming month, you’ll have to awkwardly flip between pages and struggle to build a mental image of it all. YearCircler gives you an intuitive overview of the entire year at once, allowing you to put your things into better perspective at a glance.</p>
<h3>What about calendars? They show an entire year on one page!</h3>
<p>Yes. But like agendas and planners, they do so in a limited way. In a calendar, days are read from left to read and wrap around when they no longer fit. This gives the illusion of a break in time, while in real life time is a continuous thing. Not to mention how incredibly finicky it is to write anything useful in those tiny little boxes. YearCircler displays the year in a more linear fashion and thus gives a much better impression of how time moves by.</p>
<h3>That sounds weird and confusing.</h3>
<p>That’s not a question.</p>
<h3>Fair enough. Does this mean I have to completely re-learn how to organize my life using this strange new format?</h3>
<p>Not at all! If you can tell time on a clock, you can immediately start using YearCircler. Because the year is displayed like a clock, it gives you an immediate, intuitive overview of where you are in the year and what’s coming up. Think of it as a timeline wrapped around a circle. This way, there’s no awkward jump like in daily or weekly organizers. Days, weeks, and months flow into each other seamlessly, preventing the illusion of breaks between them like flipping a page does.</p>
<h3>But everyone else counts time in days, weeks, and months, not some weird continuous format. How can I work together with them?</h3>
<p>YearCircler works with days, weeks, and months like any other organizer. Every notch on the edge of the clock face represents a day, like a notch on a regular clock represents a minute. Saturday and Sunday’s notches are bigger, so weeks are easy to keep track of. Each month has its own colour, designed to give the feel of the seasons passing, and its name is displayed like in any other calendar. So you see, YearCircler doesn’t actually use a new format for telling time, it simply displays the one we already use in a more intuitive way.</p>
<h3>Great! So I can add my own events?</h3>
<p>This wouldn't be much of an organizer if you couldn't, now would it? Just press the big ‘Add event’ button in the top-left corner.</p>
<h3>And how do I delete them?</h3>
<p>Clicking on the event gives you the option to delete it. It also displays the exact date of and day of the week for the event.</p>
<h3>Am I limited to only viewing the current year?</h3>
<p>Of course not! That would be silly. You can browse any year, past or present, using the navigation buttons in the lower-left corner.</p>
<h3>Who made this?</h3>
<p>I did! My name is Jeroen Delcour and I'm a <?php echo $age ?>-year old student of Molecular Neuroscience at the University of Amsterdam. I like to develop websites when I'm bored. Pleased to meet you!</p>
<h3>Help! My events disappear when I use a different browser or computer!</h3>
<p>Currently, events are stored locally on the browser you used to create them using an HTML5 technology called WebStorage. This allows you to get started quickly without having to create an account. In the future, a simple account system will be added so you can access your events from anywhere.</p>
<br/>
<span>That's all you need to know to use YearCircler. Have fun!</span>
<h3>Wait! I have more questions!</h3>
<p>No worries, just drop me an e-mail at <a href="mailto:contact@yearcircler.com">contact@yearcircler.com</a> and I'll get back to you.</p>

		</div>
	</div>


</body>
</html>