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
	var defss = builddefsElem(svg);
	
	drawMonths(svg, defss, centerX, centerY, radius, daysInMonth, daysInYear);
	var firstDayOfTheWeek = new Date(date.getFullYear(), 0, 1).getDay();
	drawDays(svg, centerX, centerY, radius, daysInYear, firstDayOfTheWeek);
	drawIndicator(svg, centerX, centerY, radius, date);
	drawCenterDot(svg, centerX, centerY, radius);
	var now = new Date();
	if (date.getFullYear() === now.getFullYear()) {
		drawHand(svg, centerX, centerY, radius, daysInMonth, daysInYear, now);
	}
	
	var overlay = buildOverlay(wrapper);
	drawEvents(svg, defss, centerX, centerY, radius, daysInMonth, daysInYear, date, now, overlay);
	buildEventPopups(now);
}

function drawIndicator(svg, centerX, centerY, radius, date) {
	var text = drawSVGtext(centerX,centerY,date.getFullYear(),"black","middle","sans-serif",0.1);
	text.setAttribute("font-size", style.indicator.fontSize);
	text.setAttribute("alignment-baseline", "central");
	svg.appendChild(text);
}
function buildOverlay(wrapper) {
	var overlay = document.createElement("div");
	overlay.className = "overlay";
	wrapper.appendChild(overlay);
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

function builddefsElem(svg) {
	var defss = document.createElement('defss');
	defss.id = "defss";
	svg.appendChild(defss);
	return defss;
}

function buildEventPopups(date) {
	var colorOfTheMonth = style.month.colors2[date.getMonth()];
	var eventWrappers = document.getElementsByClassName("eventWrapper"); // gets array of elements with the specified class name
	
    for (var i=0;i<eventWrappers.length;i++){
        eventWrappers[i].children[0].addEventListener('click', switchPopup, false); // make eventLabel clickable
		
		var div = document.createElement('div');
		div.className = "eventPopup";
		div.style.backgroundColor = colorOfTheMonth;
		div.style.borderColor = colorOfTheMonth;
		div.style.display = "none";
		var dateDisplay = document.createElement('div');
		var arrayid = eventWrappers[i].getAttribute("arrayid");
		var event = events[arrayid];
		dateDisplay.innerHTML = style.dayLabels[event.start.getDay()]+" "+event.start.getDate()+" "+style.monthsLabels[event.start.getMonth()];
		if (event.start - event.end != 0) {
			dateDisplay.innerHTML += " - "+style.dayLabels[event.end.getDay()]+" "+event.end.getDate()+" "+style.monthsLabels[event.end.getMonth()];
		}
		dateDisplay.className = "dateDisplay";
		div.appendChild(dateDisplay);
		eventWrappers[i].appendChild(div);
		var button = document.createElement('button');
		button.innerHTML = "Delete event";
		div.appendChild(button);
		button.addEventListener('click', deleteEvent, false);
    }
}

function switchPopup() {
	popup = this.parentNode.children[1];
	switch(popup.style.display) {
		case "none":
			popup.style.display = "inline-block";
			break;
		case "inline-block":
			popup.style.display = "none";
			break;
		defsault:
			popup.style.display = "none";
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
		length: 1, // relative to radius
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
		opacity: 0.3,
	},
	day: {
		thickness: 0.15, // relative to radius
		length: 1.2,
		color: "black",
	},
	eventLine: {
		thickness: 0.3,
		color: "black",
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
	if (events = JSON.parse(localStorage.getItem('events'))) {
		var ll = [];
		var lr = [];
		var ul = [];
		var ur = [];
		for(i=0;i<events.length;i++) { // turn stringified dates back into Date objects
			events[i].start = new Date(events[i].start);
			events[i].end = new Date(events[i].end);
			midDate = new Date((events[i].start.getTime() + events[i].end.getTime()) / 2);
			events[i].midDate = midDate;
			if (midDate < new Date(date.getFullYear(),9,01) && midDate >= new Date(date.getFullYear(),06,01)) {
				ll.push(events[i]);
			} else if (midDate < new Date(date.getFullYear(),06,01) && midDate >= new Date(date.getFullYear(),03,01)) {
				lr.push(events[i]);
			} else if (midDate < new Date(date.getFullYear()+1,00,01) && midDate >= new Date(date.getFullYear(),9,01)) {
				ul.push(events[i]);
			} else if (midDate < new Date(date.getFullYear(),03,01) && midDate >= new Date(date.getFullYear(),00,01)) {
				ur.push(events[i]);
			}
		}
		ll.sort(function (a,b) { return b.end - a.end; });
		lr.sort(function (a,b) { return a.end - b.end; });
		ul.sort(function (a,b) { return a.end - b.end; });
		ur.sort(function (a,b) { return b.end - a.end; });
		events = ll.concat(lr,ul,ur);
		// For bounding box purposes:
		// defsines the point at which overlapping events should go up or down to get out of the way of the previously drawn event
		var march31Y = centerY + Math.sin(dateToTau(2, 31, daysInMonth, daysInYear)*2*Math.PI+style.yearStartOffset) * radius;
		var october1Y = centerY + Math.sin(dateToTau(9, 1, daysInMonth, daysInYear)*2*Math.PI+style.yearStartOffset) * radius;

		for (i=0; i < events.length; i++) {
			var progressStart = dateToTau(events[i].start.getMonth(), events[i].start.getDate(), daysInMonth, daysInYear);
			var progressEnd = dateToTau(events[i].end.getMonth(), events[i].end.getDate(), daysInMonth, daysInYear);
			var todayTau = dateToTau(now.getMonth(), now.getDate(), daysInMonth, daysInYear);
			if (events[i].start.getFullYear() !== date.getFullYear() || (style.dontLookBack && now.getFullYear() == date.getFullYear() && progressEnd < todayTau)) {
				continue;
			}
			if (progressEnd == progressStart) {// check whether it's a one-day or multiple-day event
				// 1 day event
				progressTmp = progressStart;
			} else {
				// multiple day event
				progressStart -= 0.25/daysInYear;
				progressEnd += 0.25/daysInYear;
				// draw segment
				var arc = drawSVGarc(centerX,centerY,radius*1.01,progressStart,progressEnd,style.eventLine.thickness,style.eventLine.color);
				arc.setAttribute("fill", "none");
				svg.appendChild(arc);
				var progressTmp = (progressStart+progressEnd)/2;
			};
			// calculate line start and end points
			var startX = centerX + Math.cos(progressTmp*2*Math.PI+style.yearStartOffset) * radius * 1.01;
			var startY = centerY + Math.sin(progressTmp*2*Math.PI+style.yearStartOffset) * radius * 1.01;
			var endX = centerX + Math.cos(progressTmp*2*Math.PI+style.yearStartOffset) * radius * 1.05;
			var endY = centerY + Math.sin(progressTmp*2*Math.PI+style.yearStartOffset) * radius * 1.05;
			// draw text
			var x = endX;
			var y = endY - 2 - 2 * (Math.cos(progressTmp*2*Math.PI));
		//	y -= 10 + 10 * (Math.cos(progressTmp*2*Math.PI));
			
			/* create div structure as such:
			<div> // anonymous div to align names correctly in the left half of the clock
				<div class="eventWrapper">
					<div class="eventLabel">[event name goes here]</div>
				</div>
			</div>
			*/
			
			var div = document.createElement("div");
			div.style.position = "absolute";
			div.style.top = y+"%";
			events[i].el = div;
			var label = document.createElement('div');
			label.innerHTML = events[i].name;
			label.className = "eventLabel";
			if (progressTmp > 0.5) {
				div.style.transform = "translateX(-100%)";
				div.style.webkitTransform = "translateX(-100%)";
				div.style.msTransform = "translateX(-100%)";
				div.style.textAlign = "right";
			}
			div.style.left = x + "%";
			div.className = "eventWrapper";
			div.setAttribute("eventid", events[i].id);
			div.setAttribute("arrayid", i);
			div.appendChild(label);
			overlay.appendChild(div);
			var BBox = {"x": x, "y": y, "width": div.offsetWidth/window.innerWidth*100, "height": div.offsetHeight/window.innerHeight*100};
			if (events[i].midDate.getMonth() <= 3) { // if in upper right quarter, make sure it doesn't overlap with events in the lower right quarter around the march-april border
				if (BBox.y + BBox.height > march31Y) {
					var dY = Math.abs(BBox.y + BBox.height - march31Y);
					endY -= dY;
					div.style.top = endY + "%";
					BBox.y -= dY;
				}
			}
			else if (events[i].midDate.getMonth() >= 10 && BBox.y + BBox.height > october1Y) { // if in upper left quarter, make sure it doesn't overlap with events in the lower left quarter around the september-october border
				var dY = Math.abs(BBox.y + BBox.height - october1Y);
				endY -= dY;
				div.style.top = endY + "%";
				BBox.y -= dY;
			}
			
			//var BBox = div.getBBox();
			if (i > 0 && events[i-1].BBox) { // check for overlapping event names & adjust position if needed (also for end point of the line). DEPENDS ON CORRECT ARRAY ORDER!
				var prevBBox = events[i-1].BBox; // get bounding box of previous event name
				if (events[i].start.getMonth() <= 3 || events[i].start.getMonth() >= 10) { // check if event sits in upper half of clock
					if (BBox.y > prevBBox.y - BBox.height && BBox.x < prevBBox.x + prevBBox.width  && BBox.x + BBox.width  > prevBBox.x) { // if overlapping with previous event, move up so it doesn't anymore
						var dY = Math.abs(BBox.y + BBox.height - prevBBox.y);
						endY -= dY;
						div.style.top = endY - 2 - 2 * (Math.cos(progressTmp*2*Math.PI)) + "%"; + "%";
						BBox.y -= dY;
					}
				} else if (events[i].start.getMonth() <= 9 && events[i].start.getMonth() >= 4 // if event sits in lower half
						&& BBox.y - BBox.height < prevBBox.y && BBox.x < prevBBox.x + prevBBox.width  && BBox.x + BBox.width  > prevBBox.x) { // if overlapping with previous event, move down so it doesn't anymore
					var dY = Math.abs(BBox.y - BBox.height - prevBBox.y);
					endY += dY;
					div.style.top = endY - 2 - 2 * (Math.cos(progressTmp*2*Math.PI)) + "%";
					BBox.y += dY;
				}
			}
		var line = drawSVGline(svg,startX,startY,endX,endY,style.eventLine.thickness,style.eventLine.color)
		line.setAttribute("stroke-linecap", "round");
		svg.appendChild(line);
		events[i].BBox = BBox;
		}
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