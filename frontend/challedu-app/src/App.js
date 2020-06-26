
import React, { useState } from "react";
import Form from "./components/Form";
import UserContext from "./userContext";
import './App.css';
import Welcome from "./components/welcome";
import Navbar from "./components/navbar";

const App = () => {
  const [user, setUser] = useState({});

  function login(user) {
    setUser(user);
  }

  function logout() {
    setUser({});

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
  );
}
};

export default App;
