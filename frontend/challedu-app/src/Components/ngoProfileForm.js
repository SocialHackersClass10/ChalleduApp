import React, { Component } from 'react';
import UserProvider from "../UserProvider";
import { Button, Label, Container, Row, Col, FormGroup, Form } from 'reactstrap';
class NGOProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: this.props.fullName,
      description: this.props.description,
      email: this.props.email,
      address: this.props.address,
      phone: this.props.phone,
    };
    console.log(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    const { fullName, description, email, address, phone } = this.state;
    const userData = { fullName, description, email, address, phone };

    UserProvider.updateUser(userData);

  }
  render() {
    return (
      <div class=" contentpanel ">
        <Container>
          <h3>NGO / Mentor Profile</h3>
          <Row>
            <Form>
              <FormGroup>
                <Col>
                  <Row><h5>Logo</h5></Row>
                  <Row>
                    <input type="file" value="" />
                  </Row>
                  <Row>
                    <Button type="upload" >Upload</Button>
                  </Row>
                </Col>
              </FormGroup>
            </Form>
            <Form className="form">
              <FormGroup>
                <Col>
                  <Col>
                    <label>Name: </label>
                    <Col>
                      <input type="text" onChange={this.name} />
                    </Col>
                  </Col>
                  <Col>
                    <Label>Description: </Label>
                    <Col>
                      <input type="textarea"></input>
                    </Col>
                  </Col>
                  <Col>
                    <Label>Representive FullName: </Label>
                    <Col>
                      <input type="textarea"></input>
                    </Col>
                  </Col>
                  <Col>
                    <Label>Email: </Label>
                    <Col>
                      <input type="text" defaultValue={this.state.email}></input>
                    </Col>
                  </Col>
                  <Col>
                    <Label>Address: </Label>
                    <Col>
                      <input type="text" defaultValue={this.state.address}></input>
                    </Col>
                  </Col>
                  <Col>
                    <Label>Website: </Label>
                    <Col>
                      <input type="textarea"></input>
                    </Col>
                  </Col>
                  <Col>
                    <Label>Phone Number: </Label>
                    <Col>
                      <input type="number" defaultValue={this.state.phone}></input>
                    </Col>
                  </Col>
                </Col>
              </FormGroup>
            </Form>
          </Row>
          <Button onClick={this.login} color="success">Submit</Button>
        </Container>
      </div>
    );
  }
}
export default NGOProfileForm;