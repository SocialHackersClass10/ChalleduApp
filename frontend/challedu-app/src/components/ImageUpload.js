import React, { Component } from 'react';
import { Button, Container, Form, InputGroup } from 'reactstrap';
import RegisterPopup from "./RegisterPopup";

class ImageUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null,
            showPopup: false,
            text:'register'
        }
    }

    togglePopup(sms) {
        this.setState({
          showPopup: !this.state.showPopup,
          text:sms
        });
      }

    handleChange = event => { 
        // console.log(typeof(event.target.files)) 
        this.setState({ selectedFile: event.target.files[0] }); 
    }; 
    handleSubmit = (e) => {
        e.preventDefault(e);
        const formData = new FormData()
            formData.append('file',  this.state.selectedFile)
        let payload = JSON.parse(atob(localStorage.getItem('access_token').split(".")[1]));
        fetch(`http://localhost:4321/users/${payload.id}/upload`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: formData
        })
        .then(res => res.json())
        .then(file =>{ 
            console.log(file.message)
                if (file.message=='Success'){
                    this.togglePopup("Upload SUCCESS");
                }else{
                    this.togglePopup("Upload ERROR");}
                    },
            error => {
            console.log(error.message)
            this.togglePopup("Connection ERROR");
        });
    }; 
    fileData = () => { 
        if (this.state.selectedFile) { 
            return ( 
                <div> 
                    <h2>File Details:</h2> 
                    <p>File Name: {this.state.selectedFile.name}</p> 
                    <p>File Type: {this.state.selectedFile.type}</p> 
                    <p> 
                    Last Modified:{" "} 
                    {this.state.selectedFile.lastModifiedDate.toDateString()} 
                    </p> 
                </div> 
            ); 
        } else { 
            return ""
        };
    }; 
    render() { 
        return ( 
            <div>
                <h3>Select File to Upload!</h3> 
                <div>
                    <Container>
                        <Form>
                            <InputGroup>
                            <input type="file" onChange={this.handleChange} /> 
                            <Button onClick={this.handleSubmit} className='btn-btn' type="upload" color='success'> 
                            Upload! 
                            </Button>
                            </InputGroup>
                        </Form>
                    </Container>
                </div>
                {this.fileData()} 
                {this.state.showPopup ?
         <RegisterPopup
          text={this.state.text}
          closePopup={this.togglePopup.bind(this)}
         />
         : null
       }
            </div> 
        ); 
    };
}  

export default ImageUpload;