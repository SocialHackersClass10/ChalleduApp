import React from "react";
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import logo from '../images/logo.svg';
import {Link} from "react-router-dom"


const buttonStyle = { maxWidth: 200, margin: '20px  auto 10px ' };

const Registration = () => {
    const popUp = ()=>{
        alert("Thank you for registering.Your registration request is pending for approval");
    }
    return (
        <div className= "welcome">
            <img id="logo" src={logo} alt="logo" />
            <div id="welcome_msg">
                <h3>Registration</h3>
            </div>
            <div id="welcome_buttons" style={buttonStyle}>
            </div>
            <div>
                <form >
                    <div>
                        <label>Email</label>
                    </div>
                    <div>
                        <input
                            name="email"
                            type="email"/>
                    </div>
                    <div>
                        <label>Password</label>
                    </div>
                    <div>
                        <input
                            name="password"
                            type="password"

                        />
                    </div>
                    <div>
                        <label>Retype Password</label>
                    </div>
                    <div>
                        <input
                            name="password"
                            type="password"
                        />
                    </div>
                    <div>
                        <div id="welcome_buttons " style={buttonStyle}>
                            <Link to ="/">
                            <Button onClick={popUp} color="success" bsStyle="primary" bsSize="large" block> Register </Button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Registration;
