import React, { useState } from "react";
import UserContext from "./userContext";
import {BrowserRouter as Router, Route} from "react-router-dom";
import { withRouter } from "react-router";
import './App.css';


//Importing Components
import Registration from "./Components/Registration";
import ProfileForm from "./Components/ProfileForm";
import Welcome from "./Components/Welcome";
import Navbar from "./Components/navbar"
import Form from "./Components/Form";
import AllUsersList from "./Components/AllUsersList";
import MainContent from "./Components/MainContent";
import Users from "./Components/Users"
import Ngos from "./Components/Ngos"
import User from "./Components/InfosUser"
import Ngo from "./Components/InfosNgo"

const Main = withRouter(({ location }) => {
  return (<div className="parent">
    {
      location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register' && <Navbar />
    }
    <Route exact path="/" component={Welcome} />
    <Route path="/login" component={Form} />
    <Route path="/main" component={MainContent} />
    <Route path="/users" component={Users} />
    <Route path="/ngos" component={Ngos} />
    <Route path="/usersList" component={AllUsersList} />
    <Route path="/register" component={Registration} />
    <Route path="/profileform" component={ProfileForm} />
    <Route path="/user/:id" component={User} />
    <Route path="/ngo/:id" component={Ngo} />

  </div>)
})

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
        
      <Router>
        <Main />
      </Router>
      
    </UserContext.Provider>
  );      
};

export default App;
