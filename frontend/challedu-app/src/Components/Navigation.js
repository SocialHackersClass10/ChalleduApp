import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import '../App.css';
import logo from '../images/logo.svg';
import { Link } from "react-router-dom"

export default class Navigation extends Component {
    render() {
        return (
            <div>
                <Navbar color="warning" expand="md">
                    <NavbarBrand><img id="navlogo" src={logo} alt="logo" /></NavbarBrand>
                    <Nav className="mr-auto" Navigation>
                        <NavItem className="nav_button">
                            <Link to="/main">
                                <Button outline color="danger">Home</Button>
                            </Link>
                        </NavItem>
                        <NavItem className="nav_button">
                            <Link to="/users">
                                <Button outline color="success">Users</Button>
                            </Link>
                        </NavItem>
                        <NavItem className="nav_button">
                            <Link to="/ngos">
                                <Button outline color="success">NGO</Button>
                            </Link>
                        </NavItem>
                        <NavItem className="nav_button">
                            <Link to="/usersList">
                                <Button outline color="success">Admin</Button>
                            </Link>
                        </NavItem>
                        <NavItem className="nav_button">
                            <Link to="/profileform">
                                <Button outline color="info">Profile</Button>
                            </Link>
                        </NavItem>
                        <NavItem className="nav_button">
                            <Link to="/">
                                <Button outline color="danger">Exit</Button>
                            </Link>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}
