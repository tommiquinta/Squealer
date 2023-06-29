
/* function SidebarOption({active, text, Icon}) {
    return (
        <div className= {`sidebarOption ${active && 'sidebarOption--active'}`}>
            <Icon />
            <h2>{text}</h2>
        </div>
 */
import React from "react";
import './SidebarOption.css';


function SidebarOption({text, Icon}){
    return(
        <button class="side-option">
          <Icon sx={{ color:'white' }}  fontSize="large"/>
            <p>{text}</p>
          </button>

    );
}

export default SidebarOption;