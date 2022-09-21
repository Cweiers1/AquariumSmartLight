import React from "react"
import DropDown from "./dropdown";

export default function EditMenu(props) {
    const view = props.veiw;
    
    return (
        <form>
            <input type="number" className="d-none" id="eventNum" />

        <DropDown option={["option1", "option2", "option3"]} />
        </form>

    )
}