import React from "react"
import DropDown from "./dropdown";

export default function EditMenu(props) {
    const view = props.veiw;
    
    return (
        <form className={style}>
            <input type="number" className="hidden" id="eventNum" />

        <DropDown option={["option1", "option2", "option3"]} label={"Select Event :"} />
        </form>

    )
}

const style = "border-2 rounded-lg border-slate-100 col-span-3 m-4 shadow-md";