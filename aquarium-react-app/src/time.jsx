import React from "react";

export default function Time(props) {
    let time = props.time
    switch(true) {
        case (time >= 12):
            return(<h2>{time}pm</h2>);
        case (time < 12):
            return (<h2>{time}am</h2>);
        //case (time < 10):  
    }
}