import React from "react"
import '../App.css';
import logo from '../images/logo.svg';
const NoPermision = ()=>{
    return(
        <div className="welcome">
        <img id="logo" src={logo} alt="logo"/>
        <div id="welcome_msg">
        <h1>No permision</h1>
        <h2>Admins only</h2>
        </div>
        
    </div>
    )
    
}
export default NoPermision;