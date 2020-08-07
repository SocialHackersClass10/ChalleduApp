import React, { useState, useEffect, useContext } from "react";
import UserContext from "../userContext";
import UserProvider from "../UserProvider";
import NGOProvider from "../NGOProvider";
import Ngoimg from '../images/Ngoimg.png';
import Userimg from '../images/Userimg.png';
import '../App.css';
import {Card, CardText, CardDeck, CardBody} from 'reactstrap';

const MainContent = ()=>{
    const [users, setUsers] = useState([]);
    const [load, setLoad] = useState(false);
    const user = useContext(UserContext);
    const [ngos, setNGOs] = useState([]);

   
    useEffect(() => {
        //get users data
        UserProvider.getUsers(user.tokens.access_token)
            .then((data) => {
                console.log(data);
                setUsers(data.users);
                setLoad(true);
            }).catch(err => {
                console.log(err);
                setLoad(true);
            })
            
        //get ngos data
        NGOProvider.getNGOs(user.tokens.access_token)
            .then((data) => {
                console.log(data);
                setNGOs(data.ngos);
                setLoad(true);
            }).catch(err => {
                console.log(err);
                setLoad(true);
            })}, []);

    return(
        <div id="mainContentPage">
            <h1>Welcome to Challedu platform.</h1> 
            <p>In this platform NGO, NGO representatives, independent mentors and users can create their profiles 
                and share their contant information.
                </p>
            <p>You can find all our registered <b>NGO</b> and <b>Users</b> to your navigation bar in their dedicated tabs.
            This is a result of collaboration between <a href ="https://socialhackersacademy.org">Social Hackers 
            Academy</a> students of Class 10 and <a href="http://challedu.com/">Challedu.</a>
                </p>

    <CardDeck className="cardDeck">
        <Card className="mainCard" body color="warning">
            <img class="cardphoto" src={Userimg} alt="Card image cap"/>
            <CardBody>
            <CardText>Total registered Users:<b> {users.length} </b></CardText>
                </CardBody>
      </Card>

        <Card className="mainCard" body color="warning">
            <img class="cardphoto" src={Ngoimg} alt="Card image cap" />
            <CardBody>
            <CardText>Total registered NGO:<b> {ngos.length} </b></CardText>
                </CardBody>
        </Card>
      </CardDeck>
      </div>
    )
}

export default MainContent;git 