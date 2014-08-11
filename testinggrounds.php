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

<svg width="100%" height="100%" viewBox="0 0 1 1"
     xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <marker id="markerCircle" markerWidth="8" markerHeight="8" refx="5" refy="5">
        <circle cx="5" cy="5" r="3" style="stroke: none; fill:#000000;"/>
    </marker>

    <marker id="markerArrow" refx="0.02" refy="0.06"
           orient="auto">
        <path d="M0.02,0.02 L0.02,0.11 L0.10,0.06 L0.02,0.02" style="fill: #000000;" />
    </marker>
</defs>

<path d="M1,0.1 L1.5,0.1 L1.5,0.6"
      style="       marker-end: url(#markerArrow);
                 "

        />
</svg>
</body>
</html>