import React, { useState } from "react";
import UserContext from "./userContext";
import {BrowserRouter as Router, Route , Switch} from "react-router-dom";
import './App.css';


//Importing Components
import Registration from "./Components/Registration";
import ProfileForm from "./Components/ProfileForm";
import welcome from "./Components/welcome";
import Navbar from "./Components/Navigation"
import Form from "./Components/Form";
import AllUsersList from "./Components/AllUsersList";
import MainContent from "./Components/MainContent";
import Users from "./Components/Users"
import Ngos from "./Components/Ngos"
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
            <Route path="/login" component={Form} />
            <Route path="/register" component={Registration} />
            <RouteForAll path="/nopermision" component={NoPermision} />
            <Route component={Main} />
      </Switch>
       
      </Router>
    </div>
    </UserContext.Provider>
  );      
};

export default App;
