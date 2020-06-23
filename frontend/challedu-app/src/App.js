import React, { useState } from "react";
import Form from "./Components/Form";
import UserContext from "./userContext";

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
      }}
    >
      <Form />
    </UserContext.Provider>
  );
};

export default App;
