import React, { useEffect } from "react";
import Time from "./time";
//import Button from "./button";

export default function Alarm(props) {
    const [alarmView, setview] = props.viewState;
    let alarmObj = props.obj[props.id];
    console.log(alarmObj)

    return (
        <li className="m-1 rounded-lg border-2 border-slate-100 p-5 bg-white hover:shadow-md hover:scale-105 hover:border-slate-200 transition-all">
            <Time time={props.obj.time}
                onClick={
                    useEffect(() => {
                        setview(props.id)
                    })
                }
            />
        </li>
    )
}