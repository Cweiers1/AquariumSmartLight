const express = require("express");
const app = express()
const port = 5000;
//const Gpio = require("pigpio").Gpio;
const path = require("path");
const { networkInterfaces } = require("os");
const fs = require("fs");
import { EventEmitter } from "node:events";
const jsonLoaded = new EventEmitter;
let schedule;


//reads file and sends event when loaded
fs.readFile("Schedule.json", (err, data) => {
    if (err) throw err;
    schedule = JSON.parse(data);
    jsonLoaded.emit("load");
});

jsonLoaded.on("load"), () => {
    for (let i; i < schedule.length; i++) {
        if (Date(schedule[i] <= Date.now)) {
            
        }
    }
}




console.log(schedule)    
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
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
)

//get current light color, send it as http response
app.get(
    "/lightcolor", (req, res) => {
        
    }
)
    
app.get(
    "/Schedule", (req, res) => {
        
    }
)
    
//endpoint used to change light color
app.post(
    "/lightColor/:color", (req, res) => {
        
    }
)

//endpoints used to change lighing schedule, takes the new json schedule
app.post(
    "/Schedule/add/",(req, res) => {

    }
)

app.delete(
    "/Schedule/deleteall/", (req, res) => {

    }
)

app.listen(port, () => {
    console.log("Server listening");
})









