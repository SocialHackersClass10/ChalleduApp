import React, { Component } from "react";
import { Button , ButtonGroup  }  from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import logo from '../images/logo.svg';

export default class navbar extends Component {
    render() {
        return (
            <div id="navbar">
                <div>
                    <ButtonGroup id="nav_buttons" size="sm" >
                        <img id="navlogo" src={logo} alt="logo"/>
                        <Button color="danger"> Home </Button>
                        <Button color="warning"> Users </Button>
                        <Button color="warning"> NGO </Button>
                        <Button color="info"> MyProfile </Button>
                    </ButtonGroup>
               </div>
            </div>
        );
    }
}
