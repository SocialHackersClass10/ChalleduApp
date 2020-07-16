import React, { useState, useContext } from "react";
import UserContext from "../userContext";
import UserProvider from "../UserProvider";
import { useHistory } from "react-router"
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import logo from '../images/logo.svg';


const buttonStyle = { maxWidth: 200, margin: '20px  auto 10px ' };


const Form = () => {
  let history = useHistory()

  //whatever user types reseting the value
  const [values, setValues] = useState({ email: "", password: "" });

  const user = useContext(UserContext);

  const handleChange = event => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault(); // this way not refreshing when clicking submit
    setValues({ email: "", password: "" });
    submit();
  };

  //
  async function submit() {
    try {
      const loginResult = await UserProvider.loginUser(values);
      if (loginResult.error) { throw loginResult.error };

      // save the access & refresh token
      user.loginTokens({
        access_token: loginResult.access_token,
        refresh_token: loginResult.refresh_token
      });
      localStorage.setItem('access_token', loginResult.access_token)
      localStorage.setItem('refresh_token', loginResult.refresh_token)

      // seperate the payload from the access_token and decode it from base64
      let payload = JSON.parse(atob(loginResult.access_token.split(".")[1]));

      // fetch and save the user
      const userData = await UserProvider.getUser(payload.id, loginResult.access_token);
      if (userData.error) { throw userData.error };

      user.loginUser(userData);

      //redirect to route: /main
      history.push("/main")

    } catch (anError) {
      console.log('Login Error:', anError);

      // TODO:
      // include here additional desired login-error handling
      // which should be decided by the front-end team

    };
  }

  return (
    <div className="welcome">
      <img id="logo" src={logo} alt="logo" />
      <div id="welcome_msg">
        <h3>Registration</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
        </div>
        <div>
          {/* saving the email that user type to value.email */}
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
        </div>
        <div>
          {/* saving the pass that user type to value.pass */}
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <div id="welcome_buttons " style={buttonStyle}>
            <Button color="success" bsStyle="primary" bsSize="large" block type="submit"> Log In </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
