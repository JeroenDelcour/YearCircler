<!DOCTYPE html>

<html lang="en">
<head>
	<title>Yearclock</title>
	<meta charset="utf-8">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400' rel='stylesheet' type='text/css'>
	 <link rel="stylesheet" href="//code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">
	<script src="//code.jquery.com/jquery-1.10.2.js"></script>
	<script src="//code.jquery.com/ui/1.11.0/jquery-ui.js"></script>
	<script>
	$(function() {
		if(!Modernizr.inputtypes.date) {
			console.log("The 'date' input type is not supported, so using JQueryUI datepicker instead.");
			$( "#start" ).datepicker({
			  altField: "#startAlt",
			  altFormat: "yy-mm-dd"
			});
			$( "#end" ).datepicker({
			  altField: "#endAlt",
			  altFormat: "yy-mm-dd"
			});
		}
	});
	</script>
	<style>
	body {padding:0; margin:0; background-color:#FFFFFF; font-size: 1em;}
	svg {display: block; position: fixed;}
	.monthLabel {
		font-family: 'Open Sans',sans-serif;
		fill: #000;
		font-weight: 500;
		opacity: 0.3;
	}
	.day { stroke: black; opacity: 0.6; }
	.arm { stroke: black; stroke-width: 2; }
	.centerDot { fill: black; }
	.eventLine { stroke: black; stroke-width: 2; }
	.eventName { font-family: 'Open Sans',sans-serif; font-weight: 400; }
	
	.menuContainer {
		position: fixed;
		top: 1.25em;
		left: 1.25em;
		font-family: 'Open Sans',sans-serif;
		font-size: 1.2em;
		font-weight: 300;
		color: white;
		background-color: black;
		border-radius: 10px;
		font-weight: 400;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.menuButton {
		position: relative;
		padding-left: 1.5em;
		padding-right: 8px;
		cursor: pointer;
	}
	.menuButton:before {
		content: "+";
		position: absolute;
		font-weight: 400;
		font-size: 2em;
		line-height: 0.5em;
		left: 5px;
		top: 3px;
	}
	.menuButtonPlus {
		position: absolute;
		font-weight: 400;
		font-size: 2em;
		line-height: 50%;
	}
	
//	hamburger menu icon
//	.menuButton:before {
//		content: "";
//		position: absolute;
//		left: 8px;
//		top: 8px;
//		width: 17px;
//		height: 2px;
//		background: white;
//		box-shadow:
//			0 5px 0 0 white,
//			0 10px 0 0 white;
//	}

	.insertFormHidden {
		display: none;
	}
	.insertFormShown {
		display: block;
	}
	#addEventForm label {
		float: left;
		padding-right: 5px;
		text-align: left;
	}
	#addEventForm input {
		float: right;
	}
	#addEventForm {
		padding: 5px 5px 5px 30px;
	}
	#addEventSubmit {
		color: black;
		border-radius: 5px;
		width: 6em;
		text-align: center;
		margin-bottom: 5px;
		margin-top: 5px;
	}
	.submitIdle {
		cursor: pointer;
		display: block;
		background-color: #DDD;
	}
	.submitIdle:hover {
		background-color: #AAA;
	};
	.submitIdle:active {
		background-color: #666;
	};
	.submitWorking {
		cursor: default;
	}
	</style>
	<script>
	/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
	 * Build: http://modernizr.com/download/#-inputtypes-shiv-cssclasses-load
	 */
	;window.Modernizr=function(a,b,c){function v(a){j.cssText=a}function w(a,b){return v(prefixes.join(a+";")+(b||""))}function x(a,b){return typeof a===b}function y(a,b){return!!~(""+a).indexOf(b)}function z(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:x(f,"function")?f.bind(d||b):f}return!1}function A(){e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),o[a[d]]=!!e;return o}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n={},o={},p={},q=[],r=q.slice,s,t={}.hasOwnProperty,u;!x(t,"undefined")&&!x(t.call,"undefined")?u=function(a,b){return t.call(a,b)}:u=function(a,b){return b in a&&x(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e});for(var B in n)u(n,B)&&(s=B.toLowerCase(),e[s]=n[B](),q.push((e[s]?"":"no-")+s));return e.input||A(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)u(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},v(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+q.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
	</script>
</head>
<body>

<svg id="mySVG" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xpreserveAspectRatio="xMinYMin slice">
	<defs id="myDefs">
	</defs>
</svg>

<div class="menuContainer" id="menuContainer">
<div class="menuButton" onClick="menuClick()">Add event</div>
	<form class="insertFormHidden" id="addEventForm" onSubmit="addEvent();return false">
		<label for="name">Name</label>
		<input type="text" name="name" id="name" required/>
		<br/>
		<label for="start">Start</label>
		<input type="date" name="start" id="start" class="datepicker" required/>
		<input type="hidden" name="startAlt" id="startAlt"/>
		<br/>
		<label for="end">End</label>
		<input type="date" name="end" id="end" class="datepicker" required/>
		<input type="hidden" name="endalt" id="endAlt"/>
		<br/>
		<button type="submit" id="addEventSubmit" class="submitIdle">Submit</button>
	</form>
</div>
<script>
function menuClick() {
	var form = document.getElementById("addEventForm");
	if (form.className == "insertFormHidden") {
		form.className = "insertFormShown";
	} else if (form.className == "insertFormShown") {
		form.className = "insertFormHidden";
	};
};

function addEvent() {
	var name = document.getElementById('name').value;
	if(!Modernizr.inputtypes.date) {
		var start = document.getElementById('startAlt').value;
		var end = document.getElementById('endAlt').value;
	} else {
		var start = document.getElementById('start').value;
		var end = document.getElementById('end').value;
	};

    var xmlhttp= window.XMLHttpRequest ?
        new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	
	document.getElementById("addEventSubmit").innerText = "Working...";
	
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            alert(xmlhttp.responseText); // Here is the response
			document.getElementById("addEventSubmit").innerText = "Submit";
    }

    xmlhttp.open("POST","insertEvent.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("name=" + name + "&start=" + start + "&end=" + end);
};
</script>

<?php
$con=mysqli_connect("localhost:3306","root","","yearclock");
// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$result1 = mysqli_query($con,"SELECT * FROM events WHERE end < '2014-10-01' AND end >= '2014-07-01' ORDER BY start DESC ");
$result2 = mysqli_query($con,"SELECT * FROM events WHERE end < '2014-07-01' AND end >= '2014-04-01' ORDER BY start ASC ");
$result3 = mysqli_query($con,"SELECT * FROM events WHERE end < '2015-01-01' AND end >= '2014-10-01' ORDER BY start ASC ");
$result4 = mysqli_query($con,"SELECT * FROM events WHERE end < '2014-4-01' AND end >= '2014-01-01' ORDER BY start DESC ");

$data = array();
while($row = mysqli_fetch_array($result1)) {
	$data[] = addToArray($row);
};
while($row = mysqli_fetch_array($result2)) {
	$data[] = addToArray($row);
};
while($row = mysqli_fetch_array($result3)) {
	$data[] = addToArray($row);
};
while($row = mysqli_fetch_array($result4)) {
	$data[] = addToArray($row);
};

function addToArray($row) {
	preg_match('/(\d{4})-(\d{2})-(\d{2})/',$row['start'], $startMatches);
	preg_match('/(\d{4})-(\d{2})-(\d{2})/',$row['end'], $endMatches);
	$entry = array(
		"id" => $row['id'],
		"name" => $row['name'],
		"start" => array(
			"year" => (int) $startMatches[1],
			"month" => (int) $startMatches[2], 
			"day" => (int) $startMatches[3]),
		"end" => array(
			"year" => (int) $endMatches[1],
			"month" => (int) $endMatches[2], 
			"day" => (int) $endMatches[3])
	);
	return $entry;
};

mysqli_close($con);
?>

<script>
var events = JSON.parse( '<?php echo json_encode($data) ?>' );
console.log(events);
/*
window.onresize=function() {
	drawClock();
};
*/

var dontLookBack = true;

////////////////////
// CALENDAR STUFF //
////////////////////

// get today's date
var date = new Date();

// these are labels for the days of the week
daysLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// these are human-readable month name labels, in order
monthsLabels = ['January', 'February', 'March', 'April',
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'];
// these are the days of the week for each month, in order
daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
daysInYear = 365;

// check for leap year
if ((date.year % 4 == 0 && date.year % 100 != 0) || date.year % 400 == 0){
	daysInYear = 366;
	daysInMonth[1] = 29;
}

// calculate how far along in the year we are
var dayNumber = 0;
for (var i=0; i < date.getMonth(); i++) {
	dayNumber += daysInMonth[i];
};
dayNumber += date.getDate();
var progress = (dayNumber - 0.5) / daysInYear;

/////////////////////
// DRAW EVERYTHING //
/////////////////////
// draw order defines layering
	
	// clock styling
	var yearStartOffset = -.5*Math.PI;
	
/*	var monthMarkColor = "white";
	var monthMarkThickness = 2;
	var monthMarkLength = .1; // relative to clockRadius
	var newYearsMarkColor = "black";
	var newYearsMarkThickness = 4;
	var newYearsMarkLength = 0.2;
*/
	var arm = {
		color: "black",
		thickness: 2,
		length: 1.02, // relative to clockRadius
	};
	var yearIndicator = {
		fontSize: 0.25, // relative to clockRadius
		color: "#DDDDDD",
	};
	var outline = {
		color: "black",
		thickness: 5,
		margin: 30, // margin from the edge of the window, this is used to calculate the clockRadius of the clock
	};
	var month = {
		thickness: .16, // relative to clockRadius
		margin: 0, // visual separation between months (in days)
		overlap: 2, // overlap to prevent white lines between months (in days)
		fontSize: 0.08,// month label font size relative to clockRadius
		colors: ["#79becf", "#5eb69c", "#52ad46",	// color per month
				"#aec011", "#f2c313", "#f18f15",	// inspired by Andy Brice
				"#e54322", "#982c1c", "#894a3c",	// http://andybrice.net/blog/2010/01/30/year-clock/
				"#7d5e57", "#6f6c6d", "#738c91"],
		colors2: ["#85ADAD", "#83E6FF", "#66FF99",	
				"#66FF33", "#33CC33","#FFFF19",
				"#FFD915", "#FF730B","#FF1919", 
				"#B82E00", "#873E19", "#334C4C"],
	};
	var day = {
		thickness: 0.006, // relative to clockRadius
		length: 0.03, // relative to clockRadius
		color: "white",
	};

var svgNS = "http://www.w3.org/2000/svg";
var xlinkNS = "http://www.w3.org/1999/xlink";
var svg = document.getElementById("mySVG");
var def = document.getElementById("myDefs");

svg.setAttribute("width",window.innerWidth);
svg.setAttribute("height",window.innerHeight);
svg.setAttribute("viewBox", ""+0+" "+0+" "+window.innerWidth+" "+window.innerHeight+"");

var centerX = window.innerWidth/2;
var centerY = window.innerHeight/2;
var clockRadius = Math.min(window.innerWidth,window.innerHeight)/2 - outline.margin*2;
/*
var path = document.createElementNS(svgNS,"path");
path.setAttribute("id","monthLabelPath");
var startX = centerX + clockRadius * 0.85 * Math.cos(0*2*Math.PI + yearStartOffset);
var startY = centerY + clockRadius * 0.85 * Math.sin(0*2*Math.PI + yearStartOffset);
var endX = centerX + clockRadius * 0.85 * Math.cos(0.9*2*Math.PI + yearStartOffset);
var endY = centerY + clockRadius * 0.85 * Math.sin(0.9*2*Math.PI + yearStartOffset);
path.setAttribute("d","M"+startX+" "+startY+" A"+clockRadius * 0.85+" "+clockRadius * 0.85+" 0 1 1 "+endX+" "+endY+"");
document.getElementById("myDefs").appendChild(path);
path.setAttribute("style","stroke-width: 2; fill: none; stroke: black;");
svg.appendChild(path);
*/
function drawClock() {
//	svg.setAttribute("width",window.innerWidth);
//	svg.setAttribute("height",window.innerHeight);
	
	// draw months
	var beginDay = 0;
	var thicknessAbs = month.thickness * clockRadius;
	for (var i=0; i < 12; i++) {
		var endDay = beginDay + daysInMonth[i];
		var begin = (beginDay + month.margin/2) / daysInYear;
		var end = (endDay - month.margin/2) / daysInYear;
		var arc = drawSVGarc(centerX,centerY,clockRadius,begin,end,"fill: none; stroke: "+month.colors2[i]+";",thicknessAbs,"month");
		//		var arc.setAttribute("fill","url(#grad1)");
		svg.appendChild(arc);
//		var color = hslToRgb(1-(i/12-0.5),1,0.5);
//		drawSVGarc(centerX,centerY,clockRadius,begin,end,"fill: none; stroke: rgb("+Math.round(color[0])+","+Math.round(color[1])+","+Math.round(color[2])+");",thicknessAbs,"month");
		// draw month labels
		createDefPath(centerX,centerY,clockRadius*(1-month.thickness+0.03),begin,end,monthsLabels[i]); // create path for label to follow, so that it curves with the clock
//		var x = centerX + Math.cos(yearStartOffset) * clockRadius * 0.85;
//		var y = centerY + Math.sin(yearStartOffset) * clockRadius * 0.85;
		var text = drawSVGtext(0,0,"","white","middle","monthLabel"); // create the text element
		text.setAttribute("style", "font-size: "+month.fontSize*clockRadius+";"); // set font size relative to clockRadius
/*
		if (0.75 > (begin+end)/2 && (begin+end)/2 > 0.25) {
			var rotate = "rotate(180 "+centerX+","+centerY+") rotate("+((begin+end)/2-0.5)*360+" "+centerX+","+centerY+")";
		} else {
			var rotate = "rotate("+(begin+end)/2*360+" "+centerX+","+centerY+")";
		};
		text.setAttribute("transform", rotate);
*/
		
		var textPath = document.createElementNS(svgNS,"textPath"); // append link to path created earlier
		textPath.setAttributeNS(xlinkNS, "href", "#"+monthsLabels[i]);
		textPath.setAttribute("startOffset","50%");
		textPath.textContent = monthsLabels[i];
		text.appendChild(textPath);

		svg.appendChild(text);
		beginDay = endDay;
	};
	// draw day marks
	for (var i=0; i < daysInYear; i++) {
		var progressTmp = (i-0.5) / daysInYear;
		var length = ((i-4) % 7 == 0 || (i-4) % 7 == 1) ? 2*day.length : day.length;
		var startX = centerX + Math.cos(progressTmp * 2*Math.PI+yearStartOffset) * (1-length) * (clockRadius-outline.thickness/2);
		var startY = centerY + Math.sin(progressTmp * 2*Math.PI+yearStartOffset) * (1-length) * (clockRadius-outline.thickness/2);
		var endX = centerX + Math.cos(progressTmp * 2*Math.PI+yearStartOffset) * clockRadius;
		var endY = centerY + Math.sin(progressTmp * 2*Math.PI+yearStartOffset) * clockRadius;
		drawSVGline(startX,startY,endX,endY,"day","stroke-width: "+day.thickness * clockRadius+";");
	};
	// draw arm
	var startX = centerX - Math.cos(progress*2*Math.PI+yearStartOffset) * arm.length * 0.1 * clockRadius;
	var startY = centerY - Math.sin(progress*2*Math.PI+yearStartOffset) * arm.length * 0.1 * clockRadius;
	var adjustLength;
	if (date.getDay() == '0' || date.getDay() == '6') {
		adjustLength = 2*day.length - 0.04;
	} else {
		adjustLength = day.length - 0.04;
	};
	var endX = centerX + Math.cos(progress*2*Math.PI+yearStartOffset) * arm.length * clockRadius * (1 - day.length - 0.04);
	var endY = centerY + Math.sin(progress*2*Math.PI+yearStartOffset) * arm.length * clockRadius * (1 - day.length - 0.04);
	drawSVGline(startX,startY,endX,endY,"arm");
	// draw center dot
	var circle = document.createElementNS(svgNS,"circle");
	circle.setAttribute("cx",centerX);
	circle.setAttribute("cy",centerY);
	circle.setAttribute("r",clockRadius*0.03);
	circle.setAttribute("class","centerDot");
	svg.appendChild(circle);
};
var march31Y = centerY + Math.sin(convertToProgress(3,31)*2*Math.PI+yearStartOffset) * clockRadius; // for bounding box purposes
var octorber1Y = centerY + Math.sin(convertToProgress(10,1)*2*Math.PI+yearStartOffset) * clockRadius;
function drawEvents() {
	for (i=0; i < events.length; i++) {
		var progressStart = convertToProgress(events[i].start.month, events[i].start.day); // subtract one from the month because computers count from zero, so January is the 0th month
		var progressEnd = convertToProgress(events[i].end.month, events[i].end.day);
		if (dontLookBack && progressEnd < progress) {
			continue;
		};
		if (progressEnd == progressStart) {// check if it's 1 day or multiple day event
			// 1 day event
			progressTmp = progressStart;
		} else {
			// multiple day event
			progressStart -= 0.25/daysInYear;
			progressEnd += 0.25/daysInYear;
			// draw segment
			var arc = drawSVGarc(centerX,centerY,clockRadius*1.01,progressStart,progressEnd,"fill: none; stroke: black;",2);
			svg.appendChild(arc);
			var progressTmp = (progressStart+progressEnd)/2;
		};
		// calculate line start and end points
		var startX = centerX + Math.cos(progressTmp*2*Math.PI+yearStartOffset) * clockRadius * 1.01;
		var startY = centerY + Math.sin(progressTmp*2*Math.PI+yearStartOffset) * clockRadius * 1.01;
		var endX = centerX + Math.cos(progressTmp*2*Math.PI+yearStartOffset) * clockRadius * 1.05;
		var endY = centerY + Math.sin(progressTmp*2*Math.PI+yearStartOffset) * clockRadius * 1.05;
		// draw text
		var x = endX;
		var y = endY + 5 + 10 * (-Math.cos(progressTmp*2*Math.PI));
		var anchor = (progressTmp > 0.5) ? "end" : "start";
		var text = drawSVGtext(x,y,events[i].name,"black",anchor,"eventName");
		svg.appendChild(text);
		var BBox = text.getBBox();
		if (i > 0 && events[i-1].BBox) { // check for overlapping event names & adjust position if needed (also for end point of the line). DEPENDS ON CORRECT ARRAY ORDER FROM SQL QUERY
			var prevBBox = events[i-1].BBox; // get bounding box of previous event name
			if (events[i].start.month <= 3 || events[i].start.month >= 10) { // check if event sits in upper half of clock
				if (events[i].start.month <= 3) { // if in upper right quarter, make sure it doesn't overlap with events in the lower right quarter around the march-april border
					if (BBox.y + BBox.height > march31Y) {
						var dY = Math.abs(BBox.y + BBox.height - march31Y);
						endY -= dY;
						text.setAttribute("y",y-dY);
						BBox.y -= dY;
						};
				}
				else if (BBox.y + BBox.height > octorber1Y) { // if in upper left half, make sure it doesn't overlap with events in the lower left quarter around the september-october border
					var dY = Math.abs(BBox.y + BBox.height - octorber1Y);
					endY -= dY;
					text.setAttribute("y",y-dY);
					BBox.y -= dY;
				};
				if (BBox.y > prevBBox.y - BBox.height && BBox.x < prevBBox.x + prevBBox.width  && BBox.x + BBox.width  > prevBBox.x) { // if overlapping with previous event, move up so it doesn't anymore
					var dY = Math.abs(BBox.y + BBox.height - prevBBox.y);
					endY -= dY;
					text.setAttribute("y",y-dY);
					BBox.y -= dY;
				};
			} // end upper half check
			else if (events[i].start.month <= 9 && events[i].start.month >= 4 // if event sits in lower half
					&& BBox.y - BBox.height < prevBBox.y && BBox.x < prevBBox.x + prevBBox.width  && BBox.x + BBox.width  > prevBBox.x) { // if overlapping with previous event, move down so it doesn't anymore
				var dY = Math.abs(BBox.y - BBox.height - prevBBox.y);
				endY += dY;
				text.setAttribute("y",y+dY);
				BBox.y += dY;
			};
		};
		drawSVGline(startX,startY,endX,endY,"eventLine");
		events[i].BBox = BBox;
	};
};
////////////////////
// help functions //
////////////////////

function drawSVGarc(centerx,centery,radius,start,end,style,strokeWidth,classAttribute,fill) {
	radius = radius - strokeWidth/2;
	var startX = centerx + radius * Math.cos(start*2*Math.PI + yearStartOffset);
	var startY = centery + radius * Math.sin(start*2*Math.PI + yearStartOffset);
	var endX = centerx + radius * Math.cos(end*2*Math.PI + yearStartOffset);
	var endY = centery + radius * Math.sin(end*2*Math.PI + yearStartOffset);
	var largeArcFlag = ((end-start) >= 0.5) ? 1 : 0 ;
	var path = document.createElementNS(svgNS,"path");
	path.setAttribute("d","M"+startX+" "+startY+" A"+radius+" "+radius+" 0 "+largeArcFlag+" 1 "+endX+" "+endY+"");
	path.setAttribute("style",style+" stroke-width: "+strokeWidth);
	path.setAttribute("class",classAttribute);
	path.setAttribute("fill","url(#"+fill+")");
	return path;
};

function createDefPath(centerx,centery,radius,start,end,id) {
	var startX = centerx + radius * Math.cos(start*2*Math.PI + yearStartOffset);
	var startY = centery + radius * Math.sin(start*2*Math.PI + yearStartOffset);
	var endX = centerx + radius * Math.cos(end*2*Math.PI + yearStartOffset);
	var endY = centery + radius * Math.sin(end*2*Math.PI + yearStartOffset);
	var largeArcFlag = ((end-start) >= 0.5) ? 1 : 0 ;
	var path = document.createElementNS(svgNS,"path");
	path.setAttribute("d","M"+startX+" "+startY+" A"+radius+" "+radius+" 0 "+largeArcFlag+" 1 "+endX+" "+endY+"");
	path.setAttribute("id",id);
	def.appendChild(path);
};

function drawSVGline(startX,startY,endX,endY,classAttribute,style) {
	var line = document.createElementNS(svgNS,"line");
	line.setAttribute("x1",startX);
	line.setAttribute("y1",startY);
	line.setAttribute("x2",endX);
	line.setAttribute("y2",endY);
	line.setAttribute("class",classAttribute);
	line.setAttribute("style",style);
	svg.appendChild(line);
};

function drawSVGtext(x,y,content,color,anchor,classAttribute) {
	var text = document.createElementNS(svgNS,"text");
	text.setAttribute("x",x);
	text.setAttribute("y",y);
//	text.setAttribute("fill",color);
	text.setAttribute("text-anchor",anchor);
	text.setAttribute("class",classAttribute);
	text.textContent = content;
//	svg.appendChild(text);
	return text;
};

function convertToProgress(month,day) {
	// convert date to progress in the year
	month -= 1;
	var dayAbs = day;
	for (var i=0; i < month; i++) {
		dayAbs += daysInMonth[i];
	};
	var progress = (dayAbs-0.5) / daysInYear;
	return progress;
};

/**
 * By mjijackson (I think?) Source: http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r * 255, g * 255, b * 255];
}

drawClock();
drawEvents();
</script>
</body>
</html>