import react from "react";
import { IroColorPicker } from "@jaames/iro/dist/ColorPicker";
import iro from "iro";

export default function ColorPicker(props) {
    const [ colorObj, setColorObj ] = props.state;
    
    function colorChangeHandler(color) {
        setColorObj(colorPicker.rgb)
    }
    
    colorPicker.color = props.state
    const colorPicker = new iro.ColorPicker("#colorPicker");

    colorPicker.on("color:change", colorChangeHandler);

    return(
        <div>
            <div id="colorPicker">

            </div>
        </div>
    )
}