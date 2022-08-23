const express = require("express");
const app = express()
const port = 5000;
//const Gpio = require("pigpio").Gpio;

const { Worker, parentPort, workerData, isMainThread } = require('worker_threads');
const { dataPort, reqPort, resPort } = new MessageChannel();


//spawns a worker thread to run the web server
const webServer = () => {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./webServer.js");
        worker.on("message", resolve);
        worker.on("error", reject);
        worker.on("exit", (code) => {
            if (code !== 0) {
                reject(new Error(`Webserver proccess stopped with${code} exit code`));
            }
            
        })
    })
}

//waits for a return from the web server and logs the state of the server startup
const run = async () => {
    const result = await webServer();
    console.log(result);
}

run().catch(err => console.error(err));

dataPort.once("message", (message) => {
    console.log(message)
})











