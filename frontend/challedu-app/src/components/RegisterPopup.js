import React from 'react';


class RegisterPopup extends React.Component {
  render() {
    return (
        
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
        <button style={{backgroundColor:'rgb(20, 150, 250)',color:'white'}} onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}


export default RegisterPopup;