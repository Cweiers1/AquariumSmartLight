const eventSelect = document.getElementById("eventSelect");
const eventType = document.getElementById("eventType");
const colorPicker = document.getElementById("colorPicker");
const btnCloseModal = document.getElementById("btnCloseModal");
const color = document.getElementById("color");
const kelvinSelect = document.getElementById("kelvinSelect");
const rgbToggle = document.getElementById("rgbToggle");
const wwToggle = document.getElementById("wwToggle");
const eventNum = document.getElementById("eventNum");
const weeklyRadio = document.getElementById("weekly");
const dailyRadio = document.getElementById("daily");
const weeklySelect = document.getElementById("weeklySelect");
const time = document.getElementById("timeSelect");
const deleteNum = document.getElementById("deleteNum");



//TO DO: make prompt when deleting asking if sure
// const modal = new bootstrap.Modal(document.getElementById("deleteModal"), {})

//used when creating new alarms
class alarm {
	constructor(status, time, location, rgbColor, kelvin) {
		this.status = status;
		this.time = time;
		this.location = location;
		if (rgbColor) {
			this.rgbColor = rgbColor;
		}
		if (kelvin) {
			this.kelvin = kelvin;
		}
	}
}

const Schedule = {
	get: function () {
		fetch(`http://${location.hostname}:${location.port}/schedule`)
			.then((response) => response.json())
			.then((data) => {
				//renderAlarms(data);
				Schedule.events = data;
			})
	}
	,
	update: function (newAlarm) {
		fetch(`http://${location.hostname}:${location.port}/schedule`, {
			method: "POST",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newAlarm)
		})
			.then((response) => response.json())
			.then((data) => {
				schedule = data;
				clearAlarm();
				renderAlarms(schedule.events)
			})
	}
	,
	delete: function (alarm) {
		let bodymsg = {
			alarm: alarm
		}


		fetch(`http://${location.hostname}:${location.port}/schedule`, {
			method: "DELETE",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(bodymsg)
		}).then((response) => response.json())
			.then((data) => {
				schedule = data;
				clearAlarm();
				renderAlarms(data);
			})
	}
	,
	events: []
}

Schedule.get();



//fetches Schedule.json from server, passes renderer
fetch(`http://${location.hostname}:5000/schedule`)
	.then((response) => response.json())
	.then((data) => {
		schedule = data;
		renderAlarms(data);
	})

const alarmList = document.getElementById("alarmList");
const listItem = document.getElementById("listItem");
const fragment = new DocumentFragment();
let schedule;

//takes 24 hour time from server and converts to am/pm for user readiablity
function renderAlarms(data) {
	// TO DO: remove unneeded 0 on times sooner then 10am
	for (let i = 0; i < data.events.length; i++) {
		let subFragment = listItem.content.cloneNode(true);
		let btnarr = subFragment.querySelectorAll("button");
		let alarmHour = schedule.events[i].time.substring(0, 2);
		let alarmMin = schedule.events[i].time.substring(2, 4);

		if (alarmHour > 12) {
			subFragment.querySelector("div h2").innerHTML = `${alarmHour - 12}:${alarmMin}`;
			subFragment.querySelector("div p").innerHTML = "pm";
		} else if (alarmHour == 12) {
			subFragment.querySelector("div h2").innerHTML = `${alarmHour}:${alarmMin}`;
			subFragment.querySelector("div p").innerHTML = "pm";
		} else {
			subFragment.querySelector("div h2").innerHTML = `${alarmHour}:${alarmMin}`;
			subFragment.querySelector("div p").innerHTML = "am";
		}

		btnarr[0].setAttribute("onclick", `modalDelete(${i})`);
		btnarr[1].setAttribute("onclick", `modalStart(${i})`);
		fragment.appendChild(subFragment);
	}
	alarmList.appendChild(fragment);
}

// all this code handles showing and hiding elements based on form selection
eventSelect.addEventListener("change", () => {
	if ((eventSelect.value == "light") && (eventType.value == "on")) {
		color.setAttribute("class", "d-block")
	} else {
		color.setAttribute("class", "d-none")
	}
})
eventSelect.addEventListener("change", update);
eventType.addEventListener("change", update);
rgbToggle.addEventListener("change", update);
wwToggle.addEventListener("change", update);
dailyRadio.addEventListener("change", updateWeek);
weeklyRadio.addEventListener("change", updateWeek);

function update() {
	updateSlider();
	updateSwitch();
	updateWheel();
}

function updateToggle() {

}

function updateSwitch() {
	if ((eventSelect.value == "light") && (eventType.value == "on")) {
		color.setAttribute("class", "d-block")
	} else {
		color.setAttribute("class", "d-none")
	}
}

function updateWheel() {
	if (rgbToggle.checked) {
		colorPicker.setAttribute("class", "d-block")
	} else {
		colorPicker.setAttribute("class", "d-none")
	}
}

function updateSlider() {
	if (wwToggle.checked) {
		kelvinSelect.setAttribute("class", "d-block my-2")
	} else {
		kelvinSelect.setAttribute("class", "d-none")
	}
}

function updateWeek() {
	if (weeklyRadio.checked) {
		weeklySelect.setAttribute("class", "mt-3")
	} else if (dailyRadio.checked) {
		weeklySelect.setAttribute("class", "d-none")
	}
}

function modalDelete(event) {
	//pass event # to deleteEvent() when user confirms via modal
	deleteNum.value = event;
}

async function deleteEvent() {
	// event = eventNum to delete
	let bodymsg = {
		alarm: deleteNum.value
	}

	fetch(`http://${location.hostname}:${location.port}/schedule`, {
		method: "DELETE",
		cache: "no-cache",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(bodymsg)
	}).then((response) => response.json())
		.then((data) => {
			schedule = data;
			clearAlarm();
			renderAlarms(data);
		})
}

function modalStart(event) {
	let currentEvent = schedule.events[event];
	eventNum.value = event;
	eventType.value = currentEvent.status;
	eventSelect.value = currentEvent.location;

	if ("rgbColor" in currentEvent && currentEvent.rgbColor != false) {
		console.log(currentEvent.rgbColor)
		rgbToggle.checked = true;
		iroColorPicker.color.hexString = currentEvent.rgbColor;
	}

	if ("kelvin" in currentEvent && currentEvent.kelvin != false) {
		wwToggle.checked = true;
		iroKelvinPicker.color.kelvin = currentEvent.kelvin;
	}
	updateSlider();
	updateSwitch();
	updateWheel();
	updateWeek();
}

//reverts modal to default state when hidden
const modal = document.getElementById("alarmModal")


modal.addEventListener("hide.bs.modal", () => {
	document.getElementById("modalTitle").innerHTML = "Edit Event"
	eventNum.value = "";
	eventType.value = "selected";
	eventSelect.value = "selected";
	rgbToggle.checked = false;
	wwToggle.checked = false;
})

async function createAlarm() {

	const newAlarm = new alarm(
		eventType,
		time,
		eventSelect,
		iroColorPicker.color.hexString,
		iroKelvinPicker.color.kelvin
	);

	fetch(`http://${location.hostname}:${location.port}/schedule`, {
		method: "POST",
		cache: "no-cache",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(newAlarm)
	})
		.then((response) => response.json())
		.then((data) => {
			schedule = data;
			clearAlarm();
			renderAlarms(schedule.events)
		})
}

function clearAlarm() {
	while (alarmList.firstChild) {
		alarmList.lastChild.remove()
	}
}

const submit = document.getElementById("submit");
function newAlarmModal() {
	submit.setAttribute("onclick", "createAlarm");
	document.getElementById("modalTitle").innerHTML = "Add Event"
}