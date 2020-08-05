import React from 'react';
import { Button } from "reactstrap";



class ModelPopup extends React.Component {
  render() {
    return (
        
      <div className='popup'>

        <div className='popup-inner'>

          <h1>{this.props.text}</h1>
        <Button color='primary' onClick={this.props.closePopup}>close me</Button>
        </div>
      </div>
    );
  }
}


export default ModelPopup;
