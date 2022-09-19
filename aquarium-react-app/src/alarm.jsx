import React from "react";
import Time from "./time";
//import Button from "./button";

export default function Alarm(props) {

    return(
        <div>
            <Time time={props.obj.time} />
        </div>       
    )
}