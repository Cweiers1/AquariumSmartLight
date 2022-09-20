import React from "react";
import Alarm from "./alarm";


export default function AlarmList(props) {
    
    let obj = props.obj
    
  

    return(
        <ul className="flex flex-col p-2 m-4 border-2 rounded-lg w-1/4 h-full border-slate-100 bg-slate-50">
            {obj.map((ob, i) => {
                return <Alarm obj={ob} key={i} viewState={props.viewState}/>
            })}
        </ul>
    )
}


