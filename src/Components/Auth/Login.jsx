import React, { Component } from 'react';
// import components 
import LoginForm from '../forms/Login';
import NavBar from '../NavBar';

class Login extends Component {


	render() {
		return (
			<div>
				<NavBar history={this.props.history}
					location={this.props.location}
				/>
				<LoginForm history={this.props.history} />
			</div>
		);
	}
}

export default Login;
