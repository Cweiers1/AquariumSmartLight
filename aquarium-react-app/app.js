
//const Gpio = require("pigpio").Gpio;
const path = require("path");
const fs = require("fs");
let schedule;
const currentHour = () => {
	let currentTime = new Date(Date.now());
	return currentTime.getHours();
}
const currentMinute = () => {
	let currentTime = new Date(Date.now());
	return currentTime.getMinutes();
}
const currentDay = () => {
	let currentTime = new Date(Date.now());
	return currentTime.getDay();
}

fs.readFile("Schedule.json", (err, data) => {
	if (err) throw err;
	schedule = JSON.parse(data);
})

//reads file and sends event when loaded
fs.watchFile("Schedule.json", () => {
	fs.readFile("Schedule.json", (err, data) => {
		if (err) throw err;
		schedule = JSON.parse(data);
		loadNextEvent();
	});
})

function loadNextEvent() {
	for (let i=0; i < Object.keys(schedule).length-1; i++) {
		if (Object.keys(schedule)[0].substring(0,2) >= currentHour) {
			setAlarm(Object.keys(schedule)[i], schedule[Object.keys(schedule)[i]]);
			return;
		}
	}
}

function setAlarm(time, object) {
	console.log(time, object);
}

//  WEB SERVER CODE STARTS HERE
const express = require("express");
const app = express();
const port = 5000;
//serving our static content and bootstrap modules
app.use(
	"/",
	express.static("public")
)

app.use(express.json())

app.listen(port, () => {
	console.log(`Server has started on port ${port}`);
})

app.get("/schedule", (req, res) => {
	res.send(schedule);
})

app.post("/schedule", (req, res) => {
	console.log(req.json)
	// schedule.push(req.json)
})

app.delete("/schedule", async (req, res) => {
	const event = req.body.alarm;
	schedule.events.splice(event, 1);
	console.log(schedule)
	await arrObjSort(schedule.events, "time")
	writeJson(schedule);
	res.json(schedule);
})

async function writeJson(object)  {
	const data = JSON.stringify(object);
	fs.writeFile("Schedule.json", data, (err) => {
		if (err) throw err;
		return;
	})
}
function arrObjSort(arr, key) {
	arr.sort((a, b) => {
		if (a[key] < b[key]) {
			return -1
		}
		if (a[key] > b[key]) {
			return 1;
		}
		return 0;
	})
}

