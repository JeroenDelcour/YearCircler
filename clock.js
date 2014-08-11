var svgNS = "http://www.w3.org/2000/svg";
var xlinkNS = "http://www.w3.org/1999/xlink";



function init(wrapper, svg, def) {
	var now = new Date();
	
	// these are the days of the week for each month, in order
	var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var daysInYear = 365;

	// check for leap year
	if ((now.year % 4 == 0 && now.year % 100 != 0) || now.year % 400 == 0){
		daysInYear = 366;
		daysInMonth[1] = 29;
	}

//	svg.setAttribute("width",window.innerWidth);
//	svg.setAttribute("height",window.innerHeight);
//	svg.setAttribute("viewBox", ""+0+" "+0+" "+window.innerWidth+" "+window.innerHeight+"");
	
	var centerX = 0.5;
	var centerY = 0.5;
	var radius = 0.4;
	
	drawMonths(svg, def, centerX, centerY, radius, daysInMonth, daysInYear, now);
	drawDays(svg, centerX, centerY, radius, daysInYear);
	drawHand(svg, centerX, centerY, radius, daysInMonth, daysInYear, now);
	drawEvents(svg, def, centerX, centerY, radius, daysInMonth, daysInYear, now);
	buildEventPopups(now);
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
			popup.style.display = "block";
			break;
		case "block":
			popup.style.display = "none";
			break;
		default:
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
	location.reload();
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
	hand: {
		color: "black",
		thickness: 0.005,
		length: 1,
	},
	outline: {
		color: "black",
		thickness: 5,
		margin: 30, // margin from the edge of the window, this is used to calculate the radius of the clock
	},
	month: {
		thickness: .16,
		margin: 0, // visual separation between months (in days)
		overlap: 2, // overlap to prevent white lines between months (in days)
		fontSize: 0.08,// month label font size
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
		thickness: 0.0015,
		length: 0.012,
		color: "black",
	},
	eventLine: {
		thickness: 0.003,
		color: "black",
	},
}

////////////////////
// draw functions //
////////////////////

function drawMonths(svg, def, centerX, centerY, radius, daysInMonth, daysInYear, date) {
	// these are human-readable month name labels, in order
	var monthsLabels = ['January', 'February', 'March', 'April',
						 'May', 'June', 'July', 'August', 'September',
						 'October', 'November', 'December'];
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
		createDefPath(def,centerX,centerY,radius*(1-style.month.thickness+0.03),begin,end,monthsLabels[i]); // create path for label to follow, so that it curves with the clock
		var text = drawSVGtext(0,0,"","black","middle",style.month.fontFamily,style.month.opacity); // create the text element
		text.setAttribute("font-size", style.month.fontSize*radius); // set font size relative to radius
		var textPath = document.createElementNS(svgNS,"textPath"); // append link to path created earlier
		textPath.setAttributeNS(xlinkNS, "href", "#"+monthsLabels[i]);
		textPath.setAttribute("startOffset","50%");
		textPath.textContent = monthsLabels[i];
		text.appendChild(textPath);
		svg.appendChild(text);
	}
}


function drawDays(svg, centerX, centerY, radius, daysInYear) {
	for (var i=0; i < daysInYear; i++) {
		var progressTmp = (i-0.5) / daysInYear;
		var length = ((i-4) % 7 == 0 || (i-4) % 7 == 1) ? 2*style.day.length : style.day.length;
		var startX = centerX + Math.cos(progressTmp * 2*Math.PI+style.yearStartOffset) * (1-length) * (radius-style.outline.thickness/2);
		var startY = centerY + Math.sin(progressTmp * 2*Math.PI+style.yearStartOffset) * (1-length) * (radius-style.outline.thickness/2);
		var endX = centerX + Math.cos(progressTmp * 2*Math.PI+style.yearStartOffset) * radius;
		var endY = centerY + Math.sin(progressTmp * 2*Math.PI+style.yearStartOffset) * radius;
		startX = centerX + Math.cos(progressTmp * 2*Math.PI+style.yearStartOffset) * (radius-length);
		startY = centerY + Math.sin(progressTmp * 2*Math.PI+style.yearStartOffset) * (radius-length);
		endX = centerX + Math.cos(progressTmp * 2*Math.PI+style.yearStartOffset) * radius;
		endY = centerY + Math.sin(progressTmp * 2*Math.PI+style.yearStartOffset) * radius;
		drawSVGline(svg,startX,startY,endX,endY,style.day.thickness,style.day.color);
	}
}

function drawHand (svg, centerX, centerY, radius, daysInMonth, daysInYear, date) {
	// calculate how far along in the year we are
	todayTau = dateToTau(date.getMonth(), date.getDate(), daysInMonth, daysInYear);

	// draw hand
	var length = style.hand.length;
	var startX = centerX - Math.cos(todayTau*2*Math.PI+style.yearStartOffset) * length * 0.1 * radius;
	var startY = centerY - Math.sin(todayTau*2*Math.PI+style.yearStartOffset) * length * 0.1 * radius;
	if (date.getDay() == '0' || date.getDay() == '6') {
		length = length - 0.04;
	}
	var endX = centerX + Math.cos(todayTau*2*Math.PI+style.yearStartOffset) * length * radius * (1 - style.day.length - 0.04);
	var endY = centerY + Math.sin(todayTau*2*Math.PI+style.yearStartOffset) * length * radius * (1 - style.day.length - 0.04);
	drawSVGline(svg,startX,startY,endX,endY,style.hand.thickness,style.hand.color);
	
	// draw center dot
	var circle = document.createElementNS(svgNS,"circle");
	circle.setAttribute("cx",centerX);
	circle.setAttribute("cy",centerY);
	circle.setAttribute("r",radius*0.03);
	circle.setAttribute("class","centerDot");
	svg.appendChild(circle);
}

function drawEvents(svg, def, centerX, centerY, radius, daysInMonth, daysInYear, date) {
	if (events = JSON.parse(localStorage.getItem('events'))) {
		var ll = [];
		var lr = [];
		var ul = [];
		var ur = [];
		for(i=0;i<events.length;i++) { // turn stringified dates back into Date objects
			events[i].start = new Date(events[i].start);
			events[i].end = new Date(events[i].end);
			if (events[i].end < new Date(2014,09,01) && events[i].end >= new Date(2014,06,01)) {
				ll.push(events[i]);
			} else if (events[i].end < new Date(2014,06,01) && events[i].end >= new Date(2014,03,01)) {
				lr.push(events[i]);
			} else if (events[i].end < new Date(2015,00,01) && events[i].end >= new Date(2014,09,01)) {
				ul.push(events[i]);
			} else if (events[i].end < new Date(2014,03,01) && events[i].end >= new Date(2014,00,01)) {
				ur.push(events[i]);
			}
		}
		ll.sort(function (a,b) { return b.end - a.end; });
		lr.sort(function (a,b) { return a.end - b.end; });
		ul.sort(function (a,b) { return a.end - b.end; });
		ur.sort(function (a,b) { return b.end - a.end; });
		events = ll.concat(lr,ul,ur);
		/*
		events.sort(function (a,b) { // sort events for bounding box purposes
			if (a.end < new Date(2014,09,01) && a.end >= new Date(2014,06,01) && b.end < new Date(2014,09,01) && b.end >= new Date(2014,06,01)) {
				console.log(a.name+", "+b.name);
				return b.end - a.end;
			} else if (a.end < new Date(2014,06,01) && a.end >= new Date(2014,03,01) && b.end < new Date(2014,06,01) && b.end >= new Date(2014,03,01)) {
				return a.end - b.end;
			} else if (a.end < new Date(2015,00,01) && a.end >= new Date(2014,09,01) && b.end < new Date(2015,00,01) && b.end >= new Date(2014,09,01)) {
				return b.end - a.nd;
			} else if (a.end < new Date(2014,03,01) && a.end >= new Date(2014,00,01) && b.end < new Date(2014,03,01) && b.end >= new Date(2014,00,01)) {
				return a.end - b.end;
			} else {
				return 0;
		}});
		*/
		// For bounding box purposes:
		// Defines the point at which overlapping events should go up or down to get out of the way of the previously drawn event
		var march31Y = centerY + Math.sin(dateToTau(2, 31, daysInMonth, daysInYear)*2*Math.PI+style.yearStartOffset) * radius;
		var october1Y = centerY + Math.sin(dateToTau(9, 1, daysInMonth, daysInYear)*2*Math.PI+style.yearStartOffset) * radius;
		
		// create div alongside main svg element to put all event divs in
		var eventsElem = document.createElement("div");
		eventsElem.className = "events";
		svg.parentNode.appendChild(eventsElem);

		for (i=0; i < events.length; i++) {
			var progressStart = dateToTau(events[i].start.getMonth(), events[i].start.getDate(), daysInMonth, daysInYear);
			var progressEnd = dateToTau(events[i].end.getMonth(), events[i].end.getDate(), daysInMonth, daysInYear);
			var todayTau = dateToTau(date.getMonth(), date.getDate(), daysInMonth, daysInYear);
			if (events[i].start.getFullYear() !== date.getFullYear() || (style.dontLookBack && progressEnd < todayTau)) {
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
			var y = endY - 0.02 - 0.02 * (Math.cos(progressTmp*2*Math.PI));
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
			div.style.top = y*100+"%";
			events[i].el = div;
			var label = document.createElement('div');
			label.innerHTML = events[i].name;
			label.className = "eventLabel";
			if (progressTmp > 0.5) {
				var wrapper = document.createElement("div");
				wrapper.className = "eventWrapper";
				wrapper.style.cssFloat = "right";
				wrapper.style.textAlign = "right";
				wrapper.setAttribute("eventid", events[i].id);
				wrapper.appendChild(label);
				var divX = 0;
				div.style.width = x*100 + "%";
				div.appendChild(wrapper);
			} else {
				var divX = x;
				div.style.left = x*100 + "%";
				div.className = "eventWrapper";
				div.setAttribute("eventid", events[i].id);
				div.appendChild(label);
			}
			eventsElem.appendChild(div);
			var BBox = {"x": divX, "y": y, "width": div.offsetWidth/window.innerWidth, "height": div.offsetHeight/window.innerHeight};
			
			if (events[i].start.getMonth() <= 3) { // if in upper right quarter, make sure it doesn't overlap with events in the lower right quarter around the march-april border
				if (BBox.y + BBox.height > march31Y) {
					var dY = Math.abs(BBox.y + BBox.height - march31Y);
					endY -= dY;
					div.style.top = endY * 100 + "%";
					BBox.y -= dY;
				}
			}
			else if (events[i].start.getMonth() >= 10 && BBox.y + BBox.height > october1Y) { // if in upper left quarter, make sure it doesn't overlap with events in the lower left quarter around the september-october border
				var dY = Math.abs(BBox.y + BBox.height - october1Y);
				endY -= dY;
				div.style.top = endY * 100 + "%";
				BBox.y -= dY;
			}
			
			//var BBox = div.getBBox();
			if (i > 0 && events[i-1].BBox) { // check for overlapping event names & adjust position if needed (also for end point of the line). DEPENDS ON CORRECT ARRAY ORDER!
				var prevBBox = events[i-1].BBox; // get bounding box of previous event name
				if (events[i].start.getMonth() <= 3 || events[i].start.getMonth() >= 10) { // check if event sits in upper half of clock
					if (BBox.y > prevBBox.y - BBox.height && BBox.x < prevBBox.x + prevBBox.width  && BBox.x + BBox.width  > prevBBox.x) { // if overlapping with previous event, move up so it doesn't anymore
						var dY = Math.abs(BBox.y + BBox.height - prevBBox.y);
						endY -= dY;
						div.style.top = endY * 100 + "%";
						BBox.y -= dY;
					}
				} else if (events[i].start.getMonth() <= 9 && events[i].start.getMonth() >= 4 // if event sits in lower half
						&& BBox.y - BBox.height < prevBBox.y && BBox.x < prevBBox.x + prevBBox.width  && BBox.x + BBox.width  > prevBBox.x) { // if overlapping with previous event, move down so it doesn't anymore
					var dY = Math.abs(BBox.y - BBox.height - prevBBox.y);
					endY += dY;
					div.style.top = endY * 100 + "%";
					BBox.y += dY;
				}
			}
		drawSVGline(svg,startX,startY,endX,endY,style.eventLine.thickness,style.eventLine.color)
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

function createDefPath(defElem,centerx,centery,radius,start,end,id) {
	var startX = centerx + radius * Math.cos(start*2*Math.PI + style.yearStartOffset);
	var startY = centery + radius * Math.sin(start*2*Math.PI + style.yearStartOffset);
	var endX = centerx + radius * Math.cos(end*2*Math.PI + style.yearStartOffset);
	var endY = centery + radius * Math.sin(end*2*Math.PI + style.yearStartOffset);
	var largeArcFlag = ((end-start) >= 0.5) ? 1 : 0 ;
	var path = document.createElementNS(svgNS,"path");
	path.setAttribute("d","M"+startX+" "+startY+" A"+radius+" "+radius+" 0 "+largeArcFlag+" 1 "+endX+" "+endY+"");
	path.setAttribute("id",id);
	defElem.appendChild(path);
};

function drawSVGline(svg,startX,startY,endX,endY,thickness,color) {
	var line = document.createElementNS(svgNS,"line");
	line.setAttribute("x1",startX);
	line.setAttribute("y1",startY);
	line.setAttribute("x2",endX);
	line.setAttribute("y2",endY);
	line.setAttribute("stroke-width",thickness);
	line.setAttribute("stroke",color);
	svg.appendChild(line);
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