import React from 'react';
// import $ from 'jquery'
// import components 
import RegisterForm from './forms/Register';
import NavBar from './NavBar';

class Register extends React.Component {
  render() {
    return (
      <div>
      <NavBar 
        history={this.props.history} 
        location={this.props.location} 
      />
      <RegisterForm history={this.props.history} />
    </div>
    );
  }
}

export default Register;
