import React from "react";
import './/CSS/SidebarOption.css';


function SidebarOption({ active, text, Icon }) {
    if (!active)
        active = false;
    return (
        <button className={`sidebarOption ${active && 'sidebarOption--active'}`} onclick="active diventa true">
            <Icon sx={{ color: '#92a4ba' }} fontSize="large" />
            <p>{text}</p>
        </button>

    );
}


export default SidebarOption;