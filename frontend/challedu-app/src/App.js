import React, { useState } from "react";
import Form from "./Components/Form";
import AllUsersList from "./Components/AllUsersList";
import UserContext from "./userContext";
import {BrowserRouter as Router, Route} from "react-router-dom";

const App = () => {
  const [user, setUser] = useState({});

  function login(user) {
    setUser(user);
  }

  function logout() {
    setUser({});
  }

  return (
    <UserContext.Provider
      value={{
        user: user,
        login: login,
        logout: logout
      }}>
       <Router>
        <Route exact path = "/" component = {Form}/>
        <Route exact path = "/usersList" component = {AllUsersList}/>
      </Router>
      
    </UserContext.Provider>
  );
};

export default App;
