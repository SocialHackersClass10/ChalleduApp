import React, { useState } from "react";
import Form from "./Components/Form";
import AllUsersList from "./Components/AllUsersList";
import UserContext from "./userContext";
import {BrowserRouter as Router, Route} from "react-router-dom";
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
      }}>
      <Navbar/>
       <Router>
          <Route exact path = "/" component = {Welcome}/>
          <Route exact path = "/login" component = {Form}/>
          <Route exact path = "/usersList" component = {AllUsersList}/>
        
      </Router>
      
    </UserContext.Provider>
  );      
     </div>
  )
};

export default App;
