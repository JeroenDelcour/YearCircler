<!DOCTYPE html>

<html lang="en">
<head>
	<title>Testing grounds</title>
	<meta charset="utf-8">
	<style>
		body { width: 100%; height: 100%; padding: 0; margin: 0;}
	</style>
</head>
<body>
<?php // require('getEvents.php') ?>
<script>
/*
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
*/
</script>

<svg width="100%" height="100%" viewBox="0 0 500 500"
     xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <path id="MyPath" d="
    M 100,200
    A 150,200 0 0,1 450,500"/>
  </defs>

  <use xlink:href="#MyPath" fill="none" stroke="red" stroke-width="1"  />

  <text font-family="Verdana" font-size="42.5">
    <textPath xlink:href="#MyPath">
      The wheels of the bus go round and round
    </textPath>
  </text>
</svg>

<svg width="100%" height="100%" viewBox="0 0 5 5"
     xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <path id="MyPath2" d="
    M 1,2
    A 1.5,2 0 0,1 4.5,5"/>
  </defs>

  <use xlink:href="#MyPath2" fill="none" stroke="red" stroke-width="0.01"  />

  <text font-family="Verdana" font-size="0.425">
    <textPath xlink:href="#MyPath2">
      The wheels of the bus go round and round
    </textPath>
  </text>
</svg>
</body>
</html>