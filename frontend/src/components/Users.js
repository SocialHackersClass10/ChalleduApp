import React, { useState, useEffect, useContext } from "react";
import UserContext from "../userContext";
import UserProvider from "../UserProvider";
import Card from "./Card";
import '../styles/Cards.css'


function Users() {
    const [users, setUsers] = useState([]);
    const [load, setLoad] = useState(false);
    const user = useContext(UserContext);

    useEffect(() => {
        UserProvider.getUsers(user.tokens.access_token)
            .then((data) => {
                console.log(data);
                setUsers(data.users);
                setLoad(true);
            }).catch(err => {
                console.log(err);
                setLoad(true);
            })
//  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (load) {
        return (
            <div className="profiles-list row">
                { users.map((user, index) => <Card key={index} role="user" infos={user} />) }
            </div>    
        );    
    } else {
        return <div>Loading...</div>;
    }    
};

export default Users;