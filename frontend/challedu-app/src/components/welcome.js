import React, { Component } from "react";
import { Button }  from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import logo from '../images/logo.svg';

const buttonStyle = {maxWidth: 200, margin: '0 auto 10px'};



export default class welcome extends Component {
    render() {
        return (
            <div class="welcome">
                <img id="logo" src={logo} alt="logo"/>
                <div id="welcome_msg">
                    <h3>Welcome to our platform</h3>
                </div>
                <div id="welcome_buttons" style={buttonStyle}>
                    <Button color="primary" bsStyle="primary" bsSize="large" block> Login </Button>
                    <Button color="success" bsStyle="primary" bsSize="large" block> Register </Button>
                </div>
            </div>
        );
    }
}
