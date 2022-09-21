import react, { useState } from "react";

export default function DropDown(props) {

    let arr = props.option;

    const [ value, setValue ] = props.state

    function handleChange(event) {
        setValue(event.target.value)
    }


    return(
        <label>
            Select:
        <select value={value} onChange={handleChange}>
            <option value="selected">select</option>
        {arr.map((el, i) => {
            return <option key={i} value={el}>{el}</option>
        })}
        </select>
        </label>
    )
}