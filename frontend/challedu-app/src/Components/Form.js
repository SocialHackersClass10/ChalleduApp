import React, { useState, useContext } from "react";
import UserContext from "../userContext";
import UserProvider from "../UserProvider";

const Form = () => {
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
  function submit() {
    fetch("http://localhost:4321/auth/login", {
      method: "post",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          //save the tokens
          user.loginTokens({
            access_token: data.access_token,
            refresh_token: data.refresh_token
          });

          //seperate the payload from the access_token and decode it from base64
          let accessToken = data.access_token;
          let payload = accessToken.split(".")[1];
          payload = JSON.parse(atob(payload));
          
          //fetch and save the user
          user.loginUser(UserProvider.getUser(payload.id, data.access_token));

        } else {
          // handle error: user doesn't exist....
          console.log("User doesn't exist..");
        }
      });
  }

  return (
    <div>
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
          <button type="submit">Log in </button>
        </div>
      </form>
    </div>
  );
};

export default Form;