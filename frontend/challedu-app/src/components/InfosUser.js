import React from "react";
import { useState, useEffect } from "react";
import UserProvider from "../UserProvider";

const DetailsUser = ({match}) => {
    const [data, setData]=useState(null)
    const [checkError, setCheckError]=useState(null)
    const getData=async ()=>{
        try{
            const loginResult = await UserProvider.getUser(match.params.id, localStorage.getItem('access_token'));
            setData(loginResult.user)
        }catch(err){
            setCheckError(err.message)
        }
    }
    useEffect(()=>{
       getData()
       //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <h1>User Details:</h1>
            {
                data!==null ? 
                <ul>
                    <li>Full name: {data.full_name}</li>
                    <li>Pseudo: {data.username}</li>
                    <li>Email: {data.email}</li>
                    <li>Birth Date: {data.birth_date}</li>
                    <li>Role: {data.role}</li>
                    <li>Affiliated NGO: {data.affiliated_ngo.name}</li>
                    <li>Affinities: {data.affinities}</li>
                    <li>Title: {data.title}</li>
                    <li>Web Page: {data.webpage}</li>
                    <li>Picture: {data.image}</li>
                    <li>Brief description: {data.description}</li>
                    <li>Adress: {data.contact.address}</li>
                    <li>Phone: {data.contact.phone}</li>
                    <li>Contact Hours: {data.contact.contact_hours}</li>
                </ul>
                : <p>{checkError}</p>  
            }
                
        </div>
    )
}

export default DetailsUser;
