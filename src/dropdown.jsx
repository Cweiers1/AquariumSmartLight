import react, { useState } from "react";

export default function DropDown(props) {

    let arr = props.option;

    const [ value, setValue ] = props.state

    function handleChange(event) {
        setValue(event.target.value)
    }


    return(
        <div className={rootStyle}>
        <label className={labelStyle}> {props.label} </label>

        <select value={value} onChange={handleChange} className={selectStyle}>
            <option value="selected">select</option>
        {arr.map((el, i) => {
            return <option key={i} value={el}>{el}</option>
        })}
        </select>
        </div>
    )
}

const labelStyle = "";

const selectStyle = "m-2 p-1 rounded-lg";

const rootStyle = "flex flex-col w-40 m-2";