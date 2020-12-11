import React, { useState, useContext } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, Button, NavbarToggler, Collapse } from 'reactstrap';
import '../App.css';
import logo from '../images/logo.svg';
import { Link } from "react-router-dom"
import UserContext from '../userContext';
import { useMediaQuery } from 'react-responsive'


const Navigation = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const user = useContext(UserContext);
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
    const closeWhenClicked = () => { if (isMobile) { toggle() } }

    return (
        <div>
            <Navbar color="warning" light expand="md">
                <NavbarBrand><img id="navlogo" src={logo} alt="logo" /></NavbarBrand>
                <NavbarToggler onClick={toggle} className="mr-2 mt-1 " />
                <Collapse isOpen={!isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem  id="custom_button" className="nav_button px-2 ">
                            <Link to="/main">
                                <Button  className="btn-md  col-sm-6 col-md-12" outline color="danger">Home</Button>
                            </Link>
                        </NavItem>
                        <NavItem  id="custom_button" className="nav_button px-2">
                            <Link to="/users">
                                <Button   className="btn-md  col-sm-6 col-md-12" outline color="success">Users</Button>
                            </Link>
                        </NavItem>
                        <NavItem  id="custom_button"className="nav_button px-2">
                            <Link to="/ngos">
                                <Button   className="btn-md  col-sm-6 col-md-12" outline color="success">NGO</Button>
                            </Link>
                        </NavItem>
                        <NavItem  id="custom_button"className="nav_button px-2">
                            <Link to="/usersList">
                                <Button   className="btn-md  col-sm-6 col-md-12" outline color="success">Admin</Button>
                            </Link>
                        </NavItem>
                        <NavItem  id="custom_button" className="nav_button px-2">
                            <Link to="/profileform">
                                <Button   className="btn-md col-xs-3 col-sm-6 col-md-12" outline color="info">Profile</Button>
                            </Link>
                        </NavItem>
                        <NavItem  id="custom_button" className="nav_button px-2 ">
                            <Link to="/upload">
                            <Button style={{display: Object.keys(user.user).length && user.user.user.role === "admin" && "none"}}
                                className="btn-md  col-sm-6 col-md-12" outline color="info">Image Upload</Button>
                            </Link>
                        </NavItem>
                        <NavItem   id="custom_button" className="nav_button px-2">
                            <Link to="/">
                                <Button   className="btn-md col-xs-3 col-sm-6 col-md-12 " outline color="danger">Exit</Button>
                            </Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}
export default Navigation
