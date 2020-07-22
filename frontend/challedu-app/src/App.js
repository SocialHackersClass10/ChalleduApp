import React, { useState } from "react";
import UserContext from "./userContext";
import {BrowserRouter as Router, Route , Switch} from "react-router-dom";
import './App.css';


//Importing Components
import LoginForm from "./Components/LoginForm";
import ProfileForm from "./Components/ProfileForm";
import welcome from "./Components/welcome";
import Navbar from "./Components/Navigation"
import RegisterForm from "./Components/RegisterForm";
import AllUsersList from "./Components/AllUsersList";
import MainContent from "./Components/MainContent";
import Users from "./Components/Users"
import Ngos from "./Components/Ngos"
import User from "./Components/InfosUser"
import Ngo from "./Components/InfosNgo"
import RouteForAll from "./Components/RouteForAll";
import RouteOnlyForAdmins from "./Components/RouteOnlyForAdmins";
import NoPermision from "./Components/NoPermision";
import PageNotFound from "./Components/PageNotFound";
import RedirectToNotFound from "./Components/RedirectToNotFound";


const Main = () => {
  return (<div className="parent">
            <Navbar />
              <Switch>
                <RouteForAll exact path="/main" component={MainContent} />
                <RouteForAll path="/users" component={Users} />
                <RouteForAll path="/user/:id" component={User} /> 
                <RouteForAll path="/ngos" component={Ngos} />
                <RouteForAll path="/ngo/:id" component={Ngo} />
                <RouteOnlyForAdmins path="/usersList" component={AllUsersList} />
                <RouteForAll path="/profileform" component={ProfileForm} />
                <Route component={RedirectToNotFound} />
              </Switch>
  </div>)
}

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
        <div className="parent">
      <Router>
          <Switch>
            <Route path ="/notfound" component={PageNotFound} />
            <Route exact path="/" component={welcome} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <RouteForAll path="/nopermision" component={NoPermision} />
            <Route component={Main} />
      </Switch>

      </Router>
    </div>
    </UserContext.Provider>
  );
};

export default App;