<!DOCTYPE html>

<html lang="en">
<head>
	<title>Testing grounds</title>
	<meta charset="utf-8">
</head>
<body>
<?php require('getEvents.php') ?>
<script>
if(typeof(Storage) == "undefined") {
    Console.log('This browser does not support Web Storage, sorry!');
}

function saveEvents() {
	var events = <?=$events?>;
	for(i=0;i<events.length;i++) { // convert old manual date format to proper JavaScript Date object
		var start = new Date(events[i].start.year, events[i].start.month-1, events[i].start.day);
		var end =  new Date(events[i].end.year, events[i].end.month-1, events[i].end.day);
		events[i].start = start;
		events[i].end = end;
	}
	localStorage.setItem('events', JSON.stringify(events));
}

function getEvents() {
	var events = JSON.parse(localStorage.getItem('events'));
	for(i=0;i<events.length;i++) { // turn stringified dates back into Date objects
		events[i].start = new Date(events[i].start);
		events[i].end = new Date(events[i].end);
	}
	console.log(events);
	return events;
}

console.log(JSON.stringify([1,2]));
</script>

<button onClick='saveEvents()'>Move events from MySQL DB to LocalStorage</button>
</body>
</html>