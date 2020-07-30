import React ,{useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import UserContext from "../userContext";
import UserProvider from "../UserProvider";
import { useHistory } from "react-router"
const RouteOnlyForAdmins = ({component:Component , ...rest }) => {
    const user = useContext(UserContext);
    const accessTkn = sessionStorage.getItem('access_token');
    const refreshTkn = sessionStorage.getItem('refresh_token');
    const history = useHistory();
    return <Route {...rest} render = {(props) => {
        if (Object.keys(user.tokens).length) {
            let payload = JSON.parse(atob(user.tokens.access_token.split(".")[1]));
            if (payload.role === "admin"){
                return <Component {...props} />
            } else {
                return <Redirect to ="/nopermision" />;
            } 
        } else if (accessTkn && refreshTkn) {
            user.loginTokens({
                access_token: accessTkn,
                refresh_token: refreshTkn
            });
            let payload = JSON.parse(atob(accessTkn.split(".")[1]));
            // fetch and save the user
            UserProvider.getUser(payload.id, accessTkn).then(userData => user.loginUser(userData))
            history.push(history.location.pathname);
        } else {
            return <Redirect to ="/nopermision" />
        }     
    }}  /> 
}
export default RouteOnlyForAdmins