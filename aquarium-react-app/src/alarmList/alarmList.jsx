import React from "react";
import Alarm from "../alarm/alarm";
import "./alarmList.css";

export default function AlarmList(props) {
    
    let obj = props.obj
    
  

    return(
        <div>
            {obj.map((ob, i) => {
                return <Alarm obj={ob} key={i} />
            })}
        </div>
    )
}