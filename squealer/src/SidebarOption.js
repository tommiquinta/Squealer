
/* function SidebarOption({active, text, Icon}) {
    return (
        <div className= {`sidebarOption ${active && 'sidebarOption--active'}`}>
            <Icon />
            <h2>{text}</h2>
        </div>
 */
import React from "react";
import './SidebarOption.css';


function SidebarOption({active, text, Icon}){
    if(!active)
        active= false;
    return(
        <button className={ `sidebarOption ${active && 'sidebarOption--active'}`} onclick="active diventa true">
          <Icon sx={{ color:'#92a4ba' }}  fontSize="large"/>
            <p>{text}</p>
          </button>

    );
}


export default SidebarOption;