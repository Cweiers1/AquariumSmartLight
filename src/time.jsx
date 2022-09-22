import React from "react";

export default function Time(props) {
    let time = props.time
    let hour = parseInt(time.substring(0, 2), 10)
    let min = getMin();
    
    function getMin() {
        if (parseInt(time.substring(2, 4), 10) === 0) {
            return "00";
        } else {
            return parseInt(time.substring(2, 4), 10);
        }
    }

    if (hour >= 12) {
        if (hour === 12) {
            return <h1 className={Class}>{hour}:{min}pm</h1>
        }
        return <h1 className={Class}>{hour - 12}:{min}pm</h1>
    } else {
        return <h1 className={Class}>{hour}:{min}am</h1>
    }
}

const Class = "text-xl text-slate-800"