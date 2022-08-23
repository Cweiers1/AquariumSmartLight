
const colorPicker = document.getElementById("colorPicker");
const server = "http://localhost:5000";
let currentLight = getColor();


//colorPicker.onsubmit = () => {
  //  fetch("http")
//}

console.log(currentLight);
console.log("test")

//this returns undefinded, not waiting for result from server?
function getColor() {
    fetch(server + "/lightcolor")
    .then((response) => response.json())
    .then((data) => {return data});
}