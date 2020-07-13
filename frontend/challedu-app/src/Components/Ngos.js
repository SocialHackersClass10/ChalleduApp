import React, { useState, useEffect, useContext } from "react";
import UserContext from "../userContext";
import NGOProvider from "../NGOProvider";
import Card from "./Card";
import '../styles/Cards.css'


function Ngos() {
    const [ngos, setNGOs] = useState([]);
    const [load, setLoad] = useState(false);
    const user = useContext(UserContext);

    useEffect(() => {
        NGOProvider.getNGOs(user.tokens.access_token)
            .then((data) => {
                console.log(data);
                setNGOs(data.ngos);
                setLoad(true);
            }).catch(err => {
                console.log(err);
                setLoad(true);
            })
    }, []);

    if (load) {
        return (
            <div className="profiles-list row">
                { ngos.map((ngo, index) => <Card key={index} role="ngo" infos={ngo} />) }
            </div>    
        );    
    } else {
        return <div>Loading...</div>;
    }    
};

export default Ngos;