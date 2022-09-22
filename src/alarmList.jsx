import React from "react";
import Alarm from "./alarm";


export default function AlarmList(props) {
    
    let obj = props.obj
    
  

    return(
        <ul className={style}>
            {obj.map((ob, i) => {
                return <Alarm obj={ob} key={i} viewState={props.viewState}/>
            })}
        </ul>
    )
}

const style = "flex flex-col p-2 m-4 border-2 rounded-lg col-span-1 h-max border-slate-100 bg-slate-50";
