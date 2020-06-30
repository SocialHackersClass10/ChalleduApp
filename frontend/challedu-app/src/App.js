import React, { useState } from "react";
import Form from "./Components/Form";
import AllUsersList from "./Components/AllUsersList";
import UserContext from "./userContext";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Welcome from "./Components/welcome";
import Navbar from "./Components/navbar";

const App = () => {
  const [user, setUser] = useState({});
  const [tokens, setTokens] = useState({});

  function loginTokens(tokens) {
    setTokens(tokens);
  }

  function loginUser(user) {
    setUser(user);
  }

  function logout() {
    setUser({});
    setTokens({});
  }
  
  return (
    <UserContext.Provider
      value={{
        user: user,
        tokens: tokens,
        loginTokens: loginTokens,
        loginUser: loginUser,
        logout: logout
      }}>
      <Navbar/>
       <Router>
          <Route exact path = "/" component = {Welcome}/>
          <Route exact path = "/login" component = {Form}/>
          <Route exact path = "/usersList" component = {AllUsersList}/>
        
      </Router>
      
    </UserContext.Provider>
  );      
};

export default App;
