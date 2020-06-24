import React from "react";

export const UserContext = React.createContext({
  user: {},
  login: user => {},
  logout: () => {}
});

export default UserContext;