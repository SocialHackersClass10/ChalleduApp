import React ,{useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import UserContext from "../userContext";



const RouteOnlyForAdmins = ({component:Component , ...rest }) => {
    const user = useContext(UserContext);
    return <Route {...rest} render = {(props) =>{
         return Object.keys(user.user).length && user.user.user.role === "admin" ? 
            <Component {...props} /> : <Redirect to ="/nopermision" />
                
    }}  /> 
}
export default RouteOnlyForAdmins