import React, { Component } from 'react';
import { Button,Label, Card, CardBody, Col, Container, 
  Form, Input, InputGroup, CardText, Row } from 'reactstrap';

class UserProfileForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: this.props.fullName,
      description:this.props.description,
      email: this.props.email,
      address: this.props.address,
      phone: this.props.phone,
      picture: this.props.picture 
    };

    console.log(props);
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { target}  = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name }  = target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { fullName, description, email,address,phone,picture  } = this.state;
    const body = {
      fullName, description, email,address,phone,picture
    };
    const json = JSON.stringify(body);
    console.log(json);

    // axios.put('http://localhost:3000/api/user/' + this.props.data, json)
    //   .then(response => {
    //     //
    //   });
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Card className='left-inden'>
                <InputGroup className='card-descript'>
                  <Label>Full Name</Label>
                  <Input type="text" defaultValue={this.state.fullName}/>
                </InputGroup>
                <InputGroup className='card-descript'>
                  <CardBody>
                    <Label>
                      Description
                      <Input type='textarea'></Input>
                    </Label>
                  </CardBody>
                </InputGroup>
              </Card>
              <Card className="right-inden">
                <CardBody>
                  <Form>
                    <InputGroup  className='card-descript'>
                      <Label>Email  </Label>
                      <input type="text" defaultValue={this.state.email}></input>
                    </InputGroup>
                    <InputGroup className='card-descript'>
                    <Label>Address </Label>
                    <input type="text" defaultValue={this.state.address}></input>
                    </InputGroup>
                    <InputGroup className='card-descript'>
                      <Label>Phone Number </Label>
                      <input type="number" defaultValue={this.state.phone}></input>
                    </InputGroup>
                    <InputGroup className='card-descript'>
                    <Label>Picture</Label>
                      <Input type="file"
                        value=""
                      />
                      <Button className='btn-btn' type="upload" >Upload</Button>
                    </InputGroup>
                    <Button className='btn1' onClick={this.handleSubmit} color="success" block>
                      Submit
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default UserProfileForm;