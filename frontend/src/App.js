import React, { useState } from "react";
import UserContext from "./userContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withRouter } from "react-router";
import './App.css';


//Importing Components
import Registration from "./components/RegisterForm";
import ProfileForm from "./components/ProfileForm";
import Welcome from "./components/Welcome";
import Navigation from "./components/Navigation"
import LoginForm from "./components/LoginForm";
import AllUsersList from "./components/AllUsersList";
import MainContent from "./components/MainContent";
import Users from "./components/Users"
import Ngos from "./components/Ngos"


const Main = withRouter(({ location }) => {
  return (<div className="parent">
    {
      location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register' && <Navigation />
    }
    <Route exact path="/" component={Welcome} />
    <Route path="/login" component={LoginForm} />
    <Route path="/main" component={MainContent} />
    <Route path="/users" component={Users} />
    <Route path="/ngos" component={Ngos} />
    <Route path="/usersList" component={AllUsersList} />
    <Route path="/register" component={Registration} />
    <Route path="/profileform" component={ProfileForm} />
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
