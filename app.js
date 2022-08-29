
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
//reads file and sends event when loaded
fs.readFile("Schedule.json", (err, data) => {
	if (err) throw err;
	schedule = JSON.parse(data);
	loadNextEvent();
});

function loadNextEvent() {
	for (let i=0; i < Object.keys(schedule).length-1; i++) {
		if (Object.keys(schedule)[0].substring(0,2) >= currentHour()) {
			setAlarm(Object.keys(schedule)[i], schedule[Object.keys(schedule)[i]]);
			return;
		}
	}
}

function setAlarm(time, object) {
	console.log(time, object);
}


console.log(currentHour());

//  WEB SERVER CODE STARTS HERE
const express = require("express");
const app = express();
const port = 5000;
console.log(`Server has started on port ${port}`)
//serving our static content and bootstrap modules
app.use(
	"/",
	express.static("public")
)

app.use(
	"/css",
	express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
)

app.use(
	"/js",
	express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")),
	express.static(path.join(__dirname, "node_modules/@jaames/iro/dist"))
)


app.listen(port, () => {
	console.log("Server listening");
})









