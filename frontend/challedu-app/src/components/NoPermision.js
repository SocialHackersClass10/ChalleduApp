import React from "react"
import '../App.css';
import logo from '../images/logo.svg';
import { Button } from "reactstrap";
const NoPermision = ()=>{

  function  goBack(){
        window.history.back(); 
    }

    return(
        <div className="welcome">
        <img id="logo" src={logo} alt="logo"/>
        <div id="welcome_msg">
        <h1>No permission</h1>
        <h2>Admins only</h2>
        <Button onClick={goBack} color="danger" size="lg">
            Back
        </Button>
        </div>
        
    </div>
    )
    
}
export default NoPermision;
