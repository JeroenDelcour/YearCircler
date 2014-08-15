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
<script>

var svgNS = "http://www.w3.org/2000/svg";
var xlinkNS = "http://www.w3.org/1999/xlink";

var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
svg.setAttributeNS(null, "viewBox", "0 0 1000 1000");
svg.id = "clockSVG";
document.body.appendChild(svg);

var defs = document.createElement('defs');
defs.id = "defs";
svg.appendChild(defs);

var path = document.createElementNS(svgNS,"path");
path.setAttribute("d","M75,20 l100,0 l100,30 q0,100 150,100");
path.setAttribute("id","myTextPath2");
defs.appendChild(path);

var text = document.createElementNS(svgNS,"text");
text.setAttribute("x","10");
text.setAttribute("y","100");
text.setAttribute("fill","black");
svg.appendChild(text);

var textPath = document.createElementNS(svgNS,"textPath");
textPath.setAttributeNS(xlinkNS, "xlink:href", "#myTextPath2");
textPath.textContent = "Text along a more advanced path with lines and curves.";
text.appendChild(textPath);
svg.appendChild(text);

console.log(text.getBBox());

</script>
<!--
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 1000">
<defs>
    <path id="myTextPath2"
          d="M75,20 l100,0 l100,30 q0,100 150,100"/>
</defs>
<use xlink:href="#myTextPath2" fill="none" stroke="black"/>
<text x="10" y="100" style="stroke: #000000;">
    <textPath xlink:href="#myTextPath2">
        Text along a more advanced path with lines and curves.
    </textPath>
</text>  
</svg>
-->
<!--
<svg id="clockSVG" viewBox="0 0 1000 1000" xmlns:xlink="http://www.w3.org/1999/xlink"><defs>
    <path id="myTextPath2"
          d="M75,20 l100,0 l100,30 q0,100 150,100"/>
</defs>
<text x="0" y="0" style="stroke: #000000;">
	<textPath xlink:href="#myTextPath2">
		Text along a more advanced path with lines and curves.
	</textPath>
</text>
</svg>
-->
</body>
</html>
</body>
</html>