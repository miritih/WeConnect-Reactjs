import React from 'react';
// import $ from 'jquery'
// import components 
import Form from './forms/RegisterForm';
import NavBar from './NavBar';

class Register extends React.Component {
	render() {
		return (
			<div>
				<NavBar
					history={this.props.history}
					location={this.props.location}
				/>
				<Form history={this.props.history} />
			</div>
		);
	}
}
export default Register;
