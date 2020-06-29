
import React, { useState } from "react";
import Form from "./Components/Form";
import UserContext from "./userContext";
import './App.css';
import Welcome from "./Components/welcome";
import Navbar from "./Components/navbar";

const App = () => {
  const [user, setUser] = useState({});

  function login(user) {
    setUser(user);
  }

  function logout() {
    setUser({});
  }
  
  return (
    <div id="root">
    <UserContext.Provider
      value={{
        user: user,
        login: login,
        logout: logout
      }}
    >
      <Form />
    </UserContext.Provider> 
     <Navbar/> 
     <Welcome/>
     </div>
  )

};

export default App;
