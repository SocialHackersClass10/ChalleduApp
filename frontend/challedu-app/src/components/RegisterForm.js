import React, { Component } from 'react'
import UserProvider from "../UserProvider";
import { Button, Card, CardBody, Col, Container, 
    Form, Input, InputGroup, Row } from 'reactstrap';
import RegisterPopup from "./RegisterPopup";
import logo from '../images/logo.svg';
import '../App.css';

export default class RegisterComponent extends Component {
    constructor(props) {
        super()
        this.state = {
            full_name:'',
            email: '',
            password: '',
            password2:'',
            role:'user-independent',
            showPopup: false,
            text:'register'
        }
      
        this.full_name = this.full_name.bind(this);
        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
        this.password2 = this.password2.bind(this);
        this.role = this.role.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
    }

    togglePopup(sms) {
      this.setState({
        showPopup: !this.state.showPopup,
        text:sms
      });
    }

    full_name(e) {
      this.setState({full_name: e.target.value})
  }
    email(e) {
        this.setState({email: e.target.value})
    }
    password(e) {
        this.setState({password: e.target.value})
    }
    password2(e) {
        this.setState({password2: e.target.value})
    }
    role(e) {
        this.setState({role: e.target.value})
    }
    handleSubmit(e) {
        e.preventDefault();
    const { full_name, email, password, password2,role  } = this.state;

    if(password!==password2){
            alert('Ooppps ! Your password doesn`t match') 
        }else{
        
   const userData = {full_name, email, password, role }; 
   
   UserProvider.createUser(userData)
    .then(
      userData => {
      this.togglePopup("Register SUCCESS after approvment you can Login");
       },
    error => {
      error.toString();
      this.togglePopup("REGISTER ERROR");
       }
     );

      }
    } 
    render() {
      return(
        <div className="app flex-row align-items center">
          <img className="img-responsive" id="logo" src={logo} alt="logo" />
            <Container>
              <Row className='justify-content-center'>
                <Col md='9' lg='7' xl='6'>
                  <Card className='mx-4'>
                    <CardBody className='p-4'>
                       <Form>
                         <div className="mb-2 pageheading">
                           <div className='col-sm-12 btn btn-primary'>
                              Registration
                            </div>
                          </div>
                          <InputGroup className='mb-3'>
                              <Input type='text' onChange={this.full_name} placeholder='Full Name'></Input>
                            </InputGroup>
                            <InputGroup className='mb-3'>
                              <Input type='text' onChange={this.email} placeholder='email'></Input>
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <Input type='password' onChange={this.password} placeholder='password'></Input>
                            </InputGroup>
                            <InputGroup className='mb-3'>
                               <Input type='password' onChange={this.password2} placeholder='confirm password'></Input>
                            </InputGroup>
                            <select value={this.state.value} onChange={this.role}>
                               <option value='userData -independent'>User</option>
                               <option value="user-ngo">NGO</option>
                            </select>
                         <Button onClick={this.handleSubmit} color='success' block>Register</Button>
                         {this.state.showPopup ?
         <RegisterPopup
          text={this.state.text}
          closePopup={this.togglePopup.bind(this)}
         />
         : null
       }
                        </Form>
                    </CardBody>
                   </Card>
                 </Col>
             </Row>
            
         </Container>
      </div>
      )
    }
}