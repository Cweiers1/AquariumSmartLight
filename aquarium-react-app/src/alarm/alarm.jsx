import React from "react";
import Time from "../time/time";
//import Button from "./button";

export default function Alarm(props) {

    let alarmObj = props.obj[props.id];
    console.log(alarmObj)

    return(
        <div>
            <Time time={props.obj.time} />
        </div>       
    )
}