const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const { networkInterfaces } = require("os");
const { WorkerData, parentPort, MessageChannel} = require('worker_threads');
const { dataPort, reqPort, resPort } = new MessageChannel();

parentPort.postMessage(`Server has started on port ${port}`)

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

//get current light color from app.js, send it as http response
app.get(
    "/lightcolor", (req, res) => {
        dataPort.postMessage(JSON.stringify({request:"color"}))
        .then(resPort.on("message", (message) => {
            res.json(message);
        }
        ))
    }
)

app.get(
    "/Schedule", (req, res) => {
        dataPort.postMessage("getSchedule")
        .then(resPort.on("message", (message) => {
            res.json(message);
        }))
    }
)

//endpoint used to change light color
app.post(
    "/lightColor/:color", (req, res) => {
        reqPort.postMessage()
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

