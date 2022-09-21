import React, { useState } from "react"
import DropDown from "./dropdown";

export default function EditMenu(props) {
    const view = props.veiw;
    const [dropdown, setDropdown] = useState("select")
    
    return (
        <form className="grow">
            <input type="number" className="d-none" id="eventNum" />

            <DropDown option={["on", "off"]} state={[dropdown, setDropdown]} />
        </form>

    )
}