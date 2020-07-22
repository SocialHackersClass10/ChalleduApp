import React ,{useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import UserContext from "../userContext";

const RouteForAll = ({component:Component , ...rest }) => {
    const user = useContext(UserContext);
    return <Route {...rest} render = {(props) =>{
         return Object.keys(user.user).length && 
            (   user.user.user.role === "admin" || 
                user.user.user.role === "user-independent"  || 
                user.user.user.role === "user-ngo"
            )? <Component {...props} /> 
                : <Redirect to ="/login" />
                
    }}  /> 
}
export default RouteForAll