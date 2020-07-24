import React from "react";
import { Button }  from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import logo from '../images/logo.svg';
import{Link} from "react-router-dom"

const buttonStyle = {maxWidth: 100, margin: '0 auto 10px'};

const PageNotFound = ()=>{
    return(
        <div className="welcome">
        <img id="logo" src={logo} alt="logo"/>
        <div id="welcome_msg">
        <h1>404</h1>
        <h2>Oops! Page not found</h2>
        <h6>Sorry but the page you are looking for is not found.Please,make sure you have typed the correct url</h6>
        </div>
        <div id="welcome_buttons" style={buttonStyle}>
            <Link to ="/">
                <Button color="primary" bsStyle="primary" bsSize="large" block> Next </Button>
            </Link>
        </div>
    </div>
    )
    
}
export default PageNotFound;






