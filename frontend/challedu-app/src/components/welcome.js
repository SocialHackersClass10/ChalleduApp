import React, { Component } from "react";
import { Button }  from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import logo from '../images/logo.svg';
import{Link} from "react-router-dom"

const buttonStyle = {width: 150, margin: '0 auto 10px'};



export default class welcome extends Component {
    render() {
        return (
            <div className="welcome  d-flex flex-column parent justify-content-center align-items-center ">
                <img  className="img-responsive" id="logo"  src={logo} alt="logo"/>
                <div className ="mb-4" id="welcome_msg">
                    <h3>Welcome to our platform</h3>
                </div>
                <div id="welcome_buttons" style={buttonStyle}>
                    <Link to ="/login">
                        <Button className="mb-2 "color="primary" bsStyle="primary" bsSize="large" block> Login </Button>
                    </Link>
                    <Link to ="/register">
                        <Button color="success" bsStyle="primary" bsSize="large" block> Register </Button>
                    </Link>
                </div>
            </div>
        );
    }
}
