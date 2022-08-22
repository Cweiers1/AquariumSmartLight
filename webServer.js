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

app.post(
    "/lightColor/:color",

)

app.post(
    "/Schedule/:json",

)

app.listen(port, () => {
    console.log("Server listening");
})



