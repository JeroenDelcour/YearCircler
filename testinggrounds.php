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

function sortEvents(events) {
	var ur = [];
	var lr = [];
	var ll = [];
	var ul = [];
	for(i=0;i<events.length;i++) {
		var date = events[i].end;
		if (date < new Date(2014,10,01) && date >= new Date(2014,07,01)) { ll.push(events[i]); }
		else if (date < new Date(2014,07,01) && date >= new Date(2014,04,01)) { lr.push(events[i]); }
		else if (date < new Date(2015,01,01) && date >= new Date(2014,10,01)) { ul.push(events[i]); }
		else if (date < new Date(2014,04,01) && date >= new Date(2014,01,01)) { ur.push(events[i]); }
	}
	ur.sort(function (a,b) {
		return b.end - a.end; // ascending
	});
	lr.sort(function (a,b) {
		return a.end - b.end; // descending
	});
	ll.sort(function (a,b) {
		return b.end - a.end; // ascending
	});
	ul.sort(function (a,b) {
		return a.end - b.end; // descending
	});
	events = ur.concat(lr,ll,ul);
	return events;
}
</script>

<button onClick='saveEvents()'>Put events into WebStorage</button>
<br/>
<button onClick='getEvents()'>Get events and log to console</button>
<br/>
<button onClick='sortEvents(getEvents())'>Sort events</button>

</body>
</html>