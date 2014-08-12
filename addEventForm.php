<div class="menuContainer" id="menuContainer">
<div class="menuButton" onClick="menuClick()">Add event</div>
	<form class="insertFormHidden" id="addEventForm" onSubmit="addEvent();return false">
		<input type="text" name="name" id="name" autocomplete="off" placeholder="Event name" required/>
		<br/>
		<input type="text" name="start" id="addEventStart" class="datepicker" autocomplete="off" placeholder="Start date"  required/>
		<input type="hidden" name="startAlt" id="startAlt"/>
		<br/>
		<input type="text" name="end" id="addEventEnd" class="datepicker" autocomplete="off" placeholder="End date (if multi-day event)"/>
		<input type="hidden" name="endalt" id="endAlt"/>
		<br/>
		<input type="submit" id="addEventSubmit" class="submitIdle" value="Submit"></input>
	</form>
</div>

<script>
	// set 'add event' div background color to this month's color
	document.getElementById('menuContainer').setAttribute('style', 'background-color: ' + style.month.colors2[new Date().getMonth()] + ';');

	function menuClick() { // toggles the 'add event' form to show or hide
		var form = document.getElementById("addEventForm");
		if (form.className == "insertFormHidden") {
			form.className = "insertFormShown";
		} else if (form.className == "insertFormShown") {
			form.className = "insertFormHidden";
		}
	}

	function addEvent() {
		var name = document.getElementById('name').value;
		var start = document.getElementById('addEventStart').value;
		var end = document.getElementById('addEventEnd').value;
		if (end == '') { end = start; } // if no end date was given, assume a single-day event
		
		if (localStorage.getItem('events') === null) {
			var events = [];
		} else {
			var events = JSON.parse(localStorage.getItem('events'));
		}
		
		var id;
		for (id=1;id<10000;id++) {
			if (!events.some(function (el) { return el.id == id; })) {
				break;
			}
		}
		
		var newEvent = {
			id: id,
			name: name,
			start: new Date(start),
			end: new Date(end)
		};
		events.push(newEvent);
		localStorage.setItem('events', JSON.stringify(events));
		redrawClock(year);
	}
</script>