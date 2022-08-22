const express = require("express");
const app = express();
const port = 5000;
const path = require("path")
const { WorkerData, parentPort } = require('worker_threads')



parentPort.postMessage(`Server has started on port ${port}`)


//serving our static content and bootstrap modules
app.use(
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

//endpoint used to change light color
app.post(
    "/lightColor/:color", (req, res) => {

    }

)

//endpoints used to change lighing schedule
app.post(
    "/Schedule/add/:time/color/:rgb",(req, res) => {

    }

)

app.delete(
    "/Schedule/delete/:time", (req, res) => {

    }
)

app.listen(port, () => {
    console.log("Server listening");
})



