const eventSelect = document.getElementById("eventSelect");
const eventType = document.getElementById("eventType");
const colorPicker = document.getElementById("colorPicker");
const btnCloseModal = document.getElementById("btnCloseModal");
const color = document.getElementById("color");
const kelvinSelect = document.getElementById("kelvinSelect");
const rgbToggle = document.getElementById("rgbToggle");
const wwToggle = document.getElementById("wwToggle");
const alarmList = document.getElementById("alarmList");
let schedule = fetch(`http://${location.hostname}:`)


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

let fragment = new DocumentFragment();