var svgNS = "http://www.w3.org/2000/svg";
var xlinkNS = "http://www.w3.org/1999/xlink";

function init(wrapper, year) {
	// these are the days of the week for each month, in order
	var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var daysInYear = 365;
	
	var date = new Date(year, 0);
	// check for leap year
	if ((date.getFullYear() % 4 == 0 && date.getFullYear() % 100 != 0) || date.getFullYear() % 400 == 0){
		daysInYear = 366;
		daysInMonth[1] = 29;
	}

	var centerX = 50;
	var centerY = 50;
	var radius = 40;
	
	var svg = buildSVGelem(wrapper);
	var defs = buildDefsElem(svg);
	
	drawMonths(svg, defs, centerX, centerY, radius, daysInMonth, daysInYear);
	var firstDayOfTheWeek = new Date(date.getFullYear(), 0, 1).getDay();
	drawDays(svg, centerX, centerY, radius, daysInYear, firstDayOfTheWeek);
	drawIndicator(svg, centerX, centerY, radius, date);
	drawCenterDot(svg, centerX, centerY, radius);
	var now = new Date();
	if (date.getFullYear() === now.getFullYear()) {
		drawHand(svg, centerX, centerY, radius, daysInMonth, daysInYear, now);
	}
	
//	var overlay = buildOverlay(wrapper);
	drawEvents(svg, defs, centerX, centerY, radius, daysInMonth, daysInYear, date, now);
//	buildEventPopups(now, wrapper, centerX, centerY, radius, daysInMonth, daysInYear);
	setEventPopups(now, wrapper, daysInMonth, daysInYear);
}

function setEventPopups(now, SVGel, daysInMonth, daysInYear) {
	var eventLines = document.getElementsByClassName("eventLine"); // gets array of elements with the specified class name
	
    for (var i=0;i<eventLines.length;i++){
        eventLines[i].addEventListener("click", 
			function(){
				openPopup(this, SVGel, daysInMonth, daysInYear);
			}
		, false);
	}
}

function openPopup(origin, SVGel, daysInMonth, daysInYear) {
	var event = events[origin.getAttribute("arrayid")];
	origin.style.opacity = 1;
	
	var overlay = buildOverlay(); // overlay
	SVGel.appendChild(overlay);
	overlay.addEventListener("click",
		function() {
			overlay.remove();
			origin.removeAttribute("style");
		}
	, false);
	
	var eventDisplay = document.createElement("div");
	eventDisplay.id = "eventDisplay";
	eventDisplay.innerHTML = "<p>" + event.name + "<br/>" + event.start.getDate()+" "+style.monthsLabels[event.start.getMonth()]+" ("+style.dayLabels[event.start.getDay()]+")<br/>"+event.desc+"</p>";
	overlay.appendChild(eventDisplay);
}


function drawIndicator(svg, centerX, centerY, radius, date) {
	var text = drawSVGtext(centerX,centerY,date.getFullYear(),"black","middle","sans-serif",0.1);
	text.setAttribute("font-size", style.indicator.fontSize);
	text.setAttribute("alignment-baseline", "central");
	svg.appendChild(text);
}
function buildOverlay() {
	var overlay = document.createElement("div");
	overlay.className = "overlay";
	return overlay;
}

function buildSVGelem(wrapper) {
	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
	svg.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");
	svg.setAttributeNS(null, "width", "100%");
	svg.setAttributeNS(null, "height", "100%");
	svg.setAttributeNS(null, "viewBox", "0 0 100 100");
	svg.id = "clockSVG";
	wrapper.appendChild(svg);
	return svg;
}

function buildDefsElem(svg) {
	var defs = document.createElementNS(svgNS,"defs");
	defs.id = "defs";
	svg.appendChild(defs);
	return defs;
}

function buildEventPopups(date, wrapper, centerX, centerY, radius, daysInMonth, daysInYear) {
	var colorOfTheMonth = style.month.colors2[date.getMonth()];
	var eventLines = document.getElementsByClassName("eventLine"); // gets array of elements with the specified class name
	
    for (var i=0;i<eventLines.length;i++){
		var eventLine = eventLines[i];
        eventLines[i].addEventListener("click", 
			function(){
				eventPopup(this.getAttribute("arrayid"), date, wrapper, centerX, centerY, radius, daysInMonth, daysInYear);
			}
		, false);
	}
}

function eventPopup(i, date, wrapper, centerX, centerY, radius, daysInMonth, daysInYear) {
	
	var overlay = buildOverlay();
	
	var div = document.createElement('div');
	div.style.backgroundColor = colorOfTheMonth;
	div.style.borderColor = colorOfTheMonth;
	div.style.display = "inline-block";
	var dateDisplay = document.createElement('div');
	var event = events[i];
	var midDate = event.midDate;
	var midTau = dateToTau(midDate.getMonth(), midDate.getDate(), daysInMonth, daysInYear);
	var X = centerX + radius * Math.cos(midTau*2*Math.PI + style.yearStartOffset);
	console.log(X);
	var Y = centerY + radius * Math.sin(midTau*2*Math.PI + style.yearStartOffset);
	div.style.left = X + "%";
	div.style.top = Y + "%";
	if (midDate < new Date(date.getFullYear(),9,01) && midDate >= new Date(date.getFullYear(),06,01)
	|| midDate < new Date(date.getFullYear(),06,01) && midDate >= new Date(date.getFullYear(),03,01)) {
		div.className = "eventPopup up";
	} else {
		div.className = "eventPopup down";
	}
	dateDisplay.innerHTML = style.dayLabels[event.start.getDay()]+" "+event.start.getDate()+" "+style.monthsLabels[event.start.getMonth()];
	if (event.start - event.end != 0) {
		dateDisplay.innerHTML += " - "+style.dayLabels[event.end.getDay()]+" "+event.end.getDate()+" "+style.monthsLabels[event.end.getMonth()];
	}
	dateDisplay.className = "dateDisplay";
	div.appendChild(dateDisplay);
	if (event.desc && event.desc != '') {
		var desc = document.createElement('div');
		desc.className = "eventDesc";
		desc.innerHTML = event.desc;
		div.appendChild(desc);
	}
	var button = document.createElement('button');
	button.innerHTML = "Delete event";
	div.appendChild(button);
	button.addEventListener('click', deleteEvent, false);
	overlay.appendChild(div);
	wrapper.appendChild(overlay);
}

function switchPopup() {
	popup = this.parentNode.children[1];
	switch(popup.style.display) {
		case "none":
			popup.style.display = "inline-block";
			this.parentNode.style.zIndex = 100;
			this.parentNode.style.textDecoration = 'underline';
			break;
		case "inline-block":
			popup.style.display = "none";
			this.parentNode.style.zIndex = 'auto';
			this.parentNode.style.textDecoration = 'none';
			break;
		default:
			popup.style.display = "none";
			this.parentNode.style.zIndex = 'auto';
			this.parentNode.style.textDecoration = 'none';
	}
}
		
function deleteEvent() {
	var events = JSON.parse(localStorage.getItem('events'));
	var eventName = this.parentNode.parentNode.children[0].innerHTML;
	var eventid = this.parentNode.parentNode.getAttribute("eventid");
	if (confirm("Delete event \""+eventName+"\"?")) {
		newArray = events.filter(function (el) {
			return el.id != eventid;
	});
	localStorage.setItem('events', JSON.stringify(newArray));
	redrawClock(year);	
	}
}

// Because a lot of things are scaled to the clock radius, their style needs to be set using JavaScript instead of CSS
// TODO: move this to CSS using em to scale and make the SVG element's font-size attribute the only thing that needs to be set by JavaScript to scale to the clock radius
var style = {
	dontLookBack: false, // if true, prevents past events from being displayed

	yearStartOffset: -.5*Math.PI,
	
/*	var monthMarkColor = "white";
	var monthMarkThickness = 2;
	var monthMarkLength = .1; // relative to radius
	var newYearsMarkColor = "black";
	var newYearsMarkThickness = 4;
	var newYearsMarkLength = 0.2;
*/
	indicator: {
		fontSize: 27 // relative to radius
	},
	hand: {
		color: "black",
		thickness: 0.5,
		length: 1 // relative to radius
	},
	month: {
		thickness: 0.16, // relative to radius
		margin: 0, // visual separation between months (in days)
		overlap: 2, // overlap to prevent white lines between months (in days)
		fontSize: 0.08,// month label font size // relative to radius
		colors: ["#79becf", "#5eb69c", "#52ad46",	// color per month
				"#aec011", "#f2c313", "#f18f15",	// inspired by Andy Brice
				"#e54322", "#982c1c", "#894a3c",	// http://andybrice.net/blog/2010/01/30/year-clock/
				"#7d5e57", "#6f6c6d", "#738c91"],
		colors2: ["#85ADAD", "#83E6FF", "#66FF99",	
				"#66FF33", "#33CC33","#FFFF19",
				"#FFD915", "#FF730B","#FF1919", 
				"#B82E00", "#873E19", "#334C4C"],
		fontFamily: "'Opens Sans', sans-serif",
		opacity: 0.3
	},
	day: {
		thickness: 0.15, // relative to radius
		length: 1.2,
		color: "black"
	},
	eventLine: {
		thickness: 3,
		margin: 0.2,
		color: "blue"
	},
	monthsLabels: ['January', 'February', 'March', 'April',
						 'May', 'June', 'July', 'August', 'September',
						 'October', 'November', 'December'],
	dayLabels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
}

////////////////////
// draw functions //
////////////////////

function drawMonths(svg, defs, centerX, centerY, radius, daysInMonth, daysInYear) {
	// these are human-readable month name labels, in order
	var thicknessAbs = style.month.thickness * radius;
	
	var beginDay = 0;
	for (var i=0; i < 12; i++) {
		var endDay, begin, end;
		
		endDay = beginDay + daysInMonth[i];
		begin = (beginDay + style.month.margin/2) / daysInYear;
		end = (endDay - style.month.margin/2) / daysInYear;
		
		drawMonth();
		drawMonthLabel();
		
		beginDay = endDay;
	}
		
	function drawMonth() {
		var arc = drawSVGarc(centerX,centerY,radius,begin,end,thicknessAbs,style.month.colors2[i]);
		svg.appendChild(arc);
	}
	
	function drawMonthLabel() {
		createdefsPath(defs,centerX,centerY,radius*(1-style.month.thickness*0.9),begin,end,style.monthsLabels[i]); // create path for label to follow, so that it curves with the clock
		var text = drawSVGtext("","","","black","middle",style.month.fontFamily,style.month.opacity); // create the text element
		text.setAttribute("font-size", style.month.fontSize*radius); // set font size relative to radius
		var textPath = document.createElementNS(svgNS,"textPath"); // append link to path created earlier
		textPath.setAttributeNS(xlinkNS, "xlink:href", "#"+style.monthsLabels[i]);
		textPath.setAttribute("startOffset","50%");
		textPath.textContent = style.monthsLabels[i];
		text.appendChild(textPath);
		svg.appendChild(text);
	}
}


function drawDays(svg, centerX, centerY, radius, daysInYear, startingDay) {
	var dayOfTheWeek = startingDay;
	for (var i=0; i < daysInYear; i++) {
		var progressTmp = (i+0.5) / daysInYear;
		var length = (dayOfTheWeek == 0 || dayOfTheWeek == 6) ? 2*style.day.length : style.day.length;
		var startX = centerX + Math.cos(progressTmp * 2*Math.PI+style.yearStartOffset) * (1-length) * (radius);
		var startY = centerY + Math.sin(progressTmp * 2*Math.PI+style.yearStartOffset) * (1-length) * (radius);
		var endX = centerX + Math.cos(progressTmp * 2*Math.PI+style.yearStartOffset) * radius;
		var endY = centerY + Math.sin(progressTmp * 2*Math.PI+style.yearStartOffset) * radius;
		startX = centerX + Math.cos(progressTmp * 2*Math.PI+style.yearStartOffset) * (radius-length);
		startY = centerY + Math.sin(progressTmp * 2*Math.PI+style.yearStartOffset) * (radius-length);
		endX = centerX + Math.cos(progressTmp * 2*Math.PI+style.yearStartOffset) * radius;
		endY = centerY + Math.sin(progressTmp * 2*Math.PI+style.yearStartOffset) * radius;
		var line = drawSVGline(svg,startX,startY,endX,endY,style.day.thickness,style.day.color);
		svg.appendChild(line);
		
		dayOfTheWeek += 1;
		if (dayOfTheWeek > 6) { dayOfTheWeek = 0 };
	}
}

function drawCenterDot(svg, centerX, centerY, radius) {
	var circle = document.createElementNS(svgNS,"circle");
	circle.setAttribute("cx",centerX);
	circle.setAttribute("cy",centerY);
	circle.setAttribute("r",radius*0.03);
	circle.setAttribute("class","centerDot");
	svg.appendChild(circle);
};

function drawHand (svg, centerX, centerY, radius, daysInMonth, daysInYear, date) {
	// calculate how far along in the year we are
	todayTau = dateToTau(date.getMonth(), date.getDate(), daysInMonth, daysInYear);

	// draw hand
	var length = style.hand.length;
	var startX = centerX - Math.cos(todayTau*2*Math.PI+style.yearStartOffset) * length * 0.1 * radius;
	var startY = centerY - Math.sin(todayTau*2*Math.PI+style.yearStartOffset) * length * 0.1 * radius;
	var dayLength = style.day.length;
	if (date.getDay() == '0' || date.getDay() == '6') {
		dayLength *= 2;
	}
	var endX = centerX + Math.cos(todayTau*2*Math.PI+style.yearStartOffset) * (length * radius - dayLength * 1.1);
	var endY = centerY + Math.sin(todayTau*2*Math.PI+style.yearStartOffset) * (length * radius - dayLength * 1.1);
	var line = drawSVGline(svg,startX,startY,endX,endY,style.hand.thickness,style.hand.color);
	line.setAttribute("stroke-linecap","round");
	svg.appendChild(line);
}

function drawEvents(svg, defs, centerX, centerY, radius, daysInMonth, daysInYear, date, now, overlay) {
	if (localStorage.getItem('events')) {
		events = JSON.parse(localStorage.getItem('events'));
	} else {
		events = [{
			id: 1,
			name: "Welcome to YearCircler! Click this sample event to delete it",
			start: new Date(),
			end: new Date()
		},
		{
			id: 2,
			name: "First time here? Check out the FAQ",
			start: new Date(date.getFullYear(),1,1),
			end: new Date(date.getFullYear(),1,1)
		}];
		localStorage.setItem('events', JSON.stringify(events));
	}
	var dontLookBack;
	if (dontLookBack = localStorage.getItem('dontLookBack')) {
		if (dontLookBack === 'false') { dontLookBack = false; }
		else if (dontLookBack === 'true') { dontLookBack = true; }
	} else {
		localStorage.setItem('dontLookBack', 'false');
		dontLookBack = false;
	}
	for (i = 0; i < events.length; i++) { // turn stringified dates back into Date objects
		events[i].start = new Date(events[i].start);
		events[i].end = new Date(events[i].end);
		midDate = new Date((events[i].start.getTime() + events[i].end.getTime()) / 2);
		events[i].midDate = midDate;
		events[i].duration = events[i].end - events[i].start;
	}
	events.sort(function(a, b) { // sort events by duration
		return b.duration - a.duration;	
	});
	for (i = 0; i < events.length; i++) {
		if (dontLookBack && events[i].end < now) { continue; }
		var progressStart = dateToTau(events[i].start.getMonth(), events[i].start.getDate(), daysInMonth, daysInYear);
		var progressEnd = dateToTau(events[i].end.getMonth(), events[i].end.getDate(), daysInMonth, daysInYear);
		var todayTau = dateToTau(now.getMonth(), now.getDate(), daysInMonth, daysInYear);
		var midTau = dateToTau(events[i].midDate.getMonth(), events[i].midDate.getDate(), daysInMonth, daysInYear);
		progressStart -= 0.5/daysInYear;
		progressEnd += 0.5/daysInYear;
		var blacklist = [];
		for (var j = i - 1; j >= 0; j--) { // check if an event is already occupying this spot. If so, add it's level to the blacklist.
			if (events[i].start < events[j].end && events[i].end > events[j].start) {
				blacklist.push(events[j].level);
			}
		}
		for (var level = 1; level < 10000; level++) {
			if (!blacklist.some(function (el) { return el == level; })) {
				events[i].level = level;
				break;
			}
		}
		var arc = drawSVGarc(centerX,centerY,radius + (style.eventLine.margin + style.eventLine.thickness) * events[i].level,progressStart,progressEnd,style.eventLine.thickness,style.eventLine.color);
		arc.setAttribute("fill", "none");
		arc.setAttribute("stroke-opacity", style.eventLine.opacity);
		arc.setAttribute("arrayid", i);
		arc.setAttribute("class", "eventLine");
		svg.appendChild(arc);
		var progressTmp = (progressStart+progressEnd)/2;
	}
}

//////////////////////
// helper functions //
//////////////////////

function drawSVGarc(centerx,centery,radius,start,end,strokeWidth,color) {
	var radius = radius - strokeWidth/2;
	var startX = centerx + radius * Math.cos(start*2*Math.PI + style.yearStartOffset);
	var startY = centery + radius * Math.sin(start*2*Math.PI + style.yearStartOffset);
	var endX = centerx + radius * Math.cos(end*2*Math.PI + style.yearStartOffset);
	var endY = centery + radius * Math.sin(end*2*Math.PI + style.yearStartOffset);
	var largeArcFlag = ((end-start) >= 0.5) ? 1 : 0 ;
	var path = document.createElementNS(svgNS,"path");
	path.setAttribute("d","M"+startX+" "+startY+" A"+radius+" "+radius+" 0 "+largeArcFlag+" 1 "+endX+" "+endY+"");
	path.setAttribute("stroke", color);
	path.setAttribute("stroke-width", strokeWidth);
	return path;
};

function createdefsPath(defsElem,centerx,centery,radius,start,end,id) {
	var startX = centerx + radius * Math.cos(start*2*Math.PI + style.yearStartOffset);
	var startY = centery + radius * Math.sin(start*2*Math.PI + style.yearStartOffset);
	var endX = centerx + radius * Math.cos(end*2*Math.PI + style.yearStartOffset);
	var endY = centery + radius * Math.sin(end*2*Math.PI + style.yearStartOffset);
	var largeArcFlag = ((end-start) >= 0.5) ? 1 : 0 ;
	var path = document.createElementNS(svgNS,"path");
	path.setAttribute("d","M"+startX+" "+startY+" A"+radius+" "+radius+" 0 "+largeArcFlag+" 1 "+endX+" "+endY+"");
	path.setAttribute("id",id);
	defsElem.appendChild(path);
};

function drawSVGline(svg,startX,startY,endX,endY,thickness,color) {
	var line = document.createElementNS(svgNS,"line");
	line.setAttribute("x1",startX);
	line.setAttribute("y1",startY);
	line.setAttribute("x2",endX);
	line.setAttribute("y2",endY);
	line.setAttribute("stroke-width",thickness);
	line.setAttribute("stroke",color);
	return line;
};

function drawSVGtext(x,y,content,color,anchor,fontFamily,opacity) {
	var text = document.createElementNS(svgNS,"text");
	text.setAttribute("x",x);
	text.setAttribute("y",y);
	text.setAttribute("fill",color);
	text.setAttribute("text-anchor",anchor);
	text.setAttribute("font-family",fontFamily);
	text.setAttribute("fill-opacity",opacity);
	text.textContent = content;
//	svg.appendChild(text);
	return text;
};

function dateToTau(month,day,daysInMonth,daysInYear) { // convert date to Tau value if the year was a circle. Assumes months range from 0-11 and days range from 1-31.
	var dayAbs = day;
	for (var i=0; i < month; i++) {
		dayAbs += daysInMonth[i];
	};
	var tau = (dayAbs-0.5) / daysInYear;
	return tau;
};