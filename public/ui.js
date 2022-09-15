
export const iroColorPicker = new iro.ColorPicker(colorWheel, {
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
}
//seperate instance of iro, only kelvin slider
export const iroKelvinPicker = new iro.ColorPicker("#kelvinSelect", {
	layout: [
		{
			component: iro.ui.Slider,
			options: {
				sliderType: "kelvin"
			}
		}
	]
}


