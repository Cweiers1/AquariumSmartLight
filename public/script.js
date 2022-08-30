const eventSelect = document.getElementById("eventSelect");
const eventType = document.getElementById("eventType");
const colorPicker = document.getElementById("colorPicker");
const btnCloseModal = document.getElementById("btnCloseModal");
const color = document.getElementById("color");
const kelvinSelect = document.getElementById("kelvinSelect");
const rgbToggle = document.getElementById("rgbToggle");
const wwToggle = document.getElementById("wwToggle");


const iroColorPicker =  new iro.ColorPicker(colorWheel, {
  layout: [
    {
      component: iro.ui.Wheel,
      options: {}
    },
    {
      component: iro.ui.Slider,
      options: {}
    }
  ]
})

const iroKelvinPicker = new iro.ColorPicker("#kelvinSelect", {
  layout: [
    {
      component: iro.ui.Slider,
      options: {
        sliderType: "kelvin"
      }
    }
  ]
})


eventSelect.addEventListener("change", () => {
  if ((eventSelect.value == "light") && (eventType.value == "change")) {
    color.setAttribute("class", "d-block")
  } else {  
    color.setAttribute("class", "d-none")
  }
})

eventType.addEventListener("change", () => {
  if ((eventSelect.value == "light") && (eventType.value == "change")) {
    color.setAttribute("class", "d-block")
  } else {
    color.setAttribute("class", "d-none")
  }
})

rgbToggle.addEventListener("change", () => {
  if (rgbToggle.checked) {
    colorPicker.setAttribute("class", "d-block")
  } else {
    colorPicker.setAttribute("class", "d-none")
  }
})

wwToggle.addEventListener("change", () => {
  if (wwToggle.checked) {
    kelvinSelect.setAttribute("class", "d-block my-2")
  } else {
    kelvinSelect.setAttribute("class", "d-none")
  }
})

const alarmList = document.getElementById("alarmList");
const listItem = document.getElementById("listItem");
const fragment = new DocumentFragment();
let schedule;

fetch(`http://${location.hostname}:5000/schedule`)
.then((response) => response.json())
.then((data) => {
 schedule = data;
 renderAlarms(data);
})

function renderAlarms(data) {
  for(let i=0; i < data.events.length; i++) {
    let subFragment = listItem.content.cloneNode(true);
    let alarmHour = schedule.events[i].time.substring(0,2);
    let alarmMin = schedule.events[i].time.substring(3,5);
    if (alarmHour > 12) {
      subFragment.querySelector("div h2").innerHTML = `${alarmHour-12}:${alarmMin}`;
      subFragment.querySelector("div p").innerHTML = "pm";
      } else if (alarmHour == 12) {
        subFragment.querySelector("div h2").innerHTML = `${alarmHour}:${alarmMin}`;
        subFragment.querySelector("div p").innerHTML = "pm";
      } else {
        subFragment.querySelector("div h2").innerHTML = `${alarmHour}:${alarmMin}`;
        subFragment.querySelector("div p").innerHTML = "am";
      }
    fragment.appendChild(subFragment);
  }
  alarmList.appendChild(fragment);
}

document.querySelector