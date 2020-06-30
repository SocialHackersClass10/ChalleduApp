import React from "react";

export const UserContext = React.createContext({
  user: {},
  tokens: {},
  loginTokens: tokens => {},
  loginsUser: user => {},
  logout: () => {}
});

export default UserContext;