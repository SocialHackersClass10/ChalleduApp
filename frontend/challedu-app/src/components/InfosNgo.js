import React from "react";
import { useState, useEffect } from "react";
import NgoProvider from "../NGOProvider";

const DetailsNgo = ({match}) => {
    const [data, setData]=useState(null)
    const [checkError, setCheckError]=useState(null)
    const getData=async ()=>{
        try{
            const loginResult = await NgoProvider.getNGO(match.params.id, localStorage.getItem('access_token'));
            setData(loginResult.ngo)
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
            <ul>
            {
                data!==null ? 
                <ul>
                    <li>Name: {data.name}</li>
                    <li>Affinities: {data.affinities}</li>
                    <li>Main Representative: {data.main_representative}</li>
                    <li>Web Page: {data.webpage}</li>
                    <li>Picture: {data.image}</li>
                    <li>Brief description: {data.description}</li>
                    <li>Adress: {data.contact.address}</li>
                    <li>Phone: {data.contact.phone}</li>
                    <li>Contact Hours: {data.contact.contact_hours}</li>
                    <li>Documents: Will be upload later.....................</li>
                </ul>
                : <p>{checkError}</p>  
            }
            </ul>
        </div>
    )
}

export default DetailsNgo;
