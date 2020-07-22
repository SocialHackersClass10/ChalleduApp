import React, { useState } from "react";
import UserContext from "./userContext";
import {BrowserRouter as Router, Route , Switch} from "react-router-dom";
import './App.css';


//Importing Components
import LoginForm from "./components/LoginForm";
import ProfileForm from "./components/ProfileForm";
import welcome from "./components/welcome";
import Navbar from "./components/Navigation"
import RegisterForm from "./components/RegisterForm";
import AllUsersList from "./components/AllUsersList";
import MainContent from "./components/MainContent";
import Users from "./components/Users"
import Ngos from "./components/Ngos"
import RouteForAll from "./components/RouteForAll";
import RouteOnlyForAdmins from "./components/RouteOnlyForAdmins";
import NoPermision from "./components/NoPermision";
import PageNotFound from "./components/PageNotFound";
import RedirectToNotFound from "./components/RedirectToNotFound";


const Main = () => {
  return (<div className="parent">
            <Navbar />
              <Switch>
                <RouteForAll exact path="/main" component={MainContent} />
                <RouteForAll path="/users" component={Users} />
                <RouteForAll path="/user/:id" component={PageNotFound} /> {/*change here with the component of profile for each user  */}
                <RouteForAll path="/ngos" component={Ngos} />
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
