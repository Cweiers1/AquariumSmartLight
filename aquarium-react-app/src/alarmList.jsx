import React from "react";
import Alarm from "./alarm";

export default function AlarmList(props) {
    
    let alarmArr = props.obj;

    let componentArr = alarmArr.map((i) => {
        <li>{i}</li>
    })

    return(
     <ul>{componentArr}</ul>
    )
}