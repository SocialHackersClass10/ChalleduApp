import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Container, 
    Form, Input, InputGroup, Row } from 'reactstrap';

export default class RegisterComponent extends Component {
    constructor() {
        super()
        this.state = {
            Email: '',
            Password: '',
            Password2:'',
            NgoMentor:''
        }
        this.Email = this.Email.bind(this);
        this.Password = this.Password.bind(this);
        this.Password2 = this.Password2.bind(this);
        this.NgoMentor = this.NgoMentor.bind(this);
        this.login = this.login.bind(this)
    }
    Email(e) {
        this.setState({Email: e.target.value})
    }
    Password(e) {
        this.setState({Password: e.target.value})
    }
    Password2(e) {
        this.setState({Password2: e.target.value})
    }
    NgoMentor(e) {
        this.setState({NgoMentor: e.target.value})
    }
    login(e) {
        if(this.Password!==this.Password2){
            alert('Ooppps ! Your password doesn`t match') 
        }
        fetch("http://localhost:4321/", {
            method: 'POST',
            headers: { 'Content-Type': 'application.json' },
            body: JSON.stringify({
                Email: this.state.Email,
                Password: this.state.Password,
                NgoMentor: this.state.NgoMentor,
            })
        })
        .then((Response) => Response.json())
        .then((result) => {
            console.log(result)
            if (result.Status === 'Success')
                this.props.history.push("/UserProfileComponent");
            else 
            alert('Ooppps !!!! Sorrrrrry !!!!!')
        })
    }
    render() {
        return(
            <div className="app flex-row align-items center">
                <Container>
                    <Row className='justify-content-center'>
                        <Col md='9' lg='7' xl='6'>
                            <Card className='mx-4'>
                                <CardBody className='p-4'>
                                    <Form>
                                        <div class='row' className="mb-2 pageheading">
                                         <div class='col-sm-12 btn btn-primary'>
                                              Registration
                                            </div>
                                        </div>
                                        <InputGroup className='mb-3'>
                                        <Input type='text' onChange={this.Email} placeholder='email'></Input>
                                        </InputGroup>
                                        <InputGroup className='mb-3'>
                                        <Input type='password' onChange={this.Password} placeholder='password'></Input>
                                        </InputGroup>
                                        <InputGroup className='mb-3'>
                                            <Input type='password' onChange={this.Password2} placeholder='confirm password'></Input>
                                        </InputGroup>
                                      
                                       <select value={this.state.value} onChange={this.NgoMentor}>
                                        <option value="ngo">NGO</option>
                                        <option value="mentor">Mentor</option>
                                      </select>
                                   
                                        <Button onClick={this.login} color='success' block>Register</Button>
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