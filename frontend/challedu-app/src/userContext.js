import React from "react";

export const UserContext = React.createContext({
  user: {},
  tokens: {},
  loginTokens: tokens => {},
  loginUser: user => {},
  logout: () => {}
});

export default UserContext;