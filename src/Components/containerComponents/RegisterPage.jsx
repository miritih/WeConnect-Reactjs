import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import {Redirect} from 'react-router-dom';
import Form from '../forms/RegisterForm';
import NavBar from '../common/NavBar';
import * as RegisterUserActions from '../../actions/registerUserAction';

class RegisterPage extends React.Component {
	constructor(props) {
		super(props);
		this.actions = 	this.props.actions;
		this.handleChange = this.handleChange.bind(this);
		this.confirmPass = this.confirmPass.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.actions.inputChange({prop: e.target.name, value: e.target.value});
	}
	confirmPass(e) {
		this.actions.inputChange({prop: 'cpassword', value: e.target.value});
	}
	handleSubmit(event) {
		event.preventDefault();
		const {
			username,
			email,
			password,
			first_name,
			last_name,
		}=this.props.registerUser;
		this.props.actions.registerUser({username, email, first_name, last_name, password});
	}
	render() {
		const props = this.props;
		const inputs = this.props.registerUser;
		if (inputs.redirect) {
			return <Redirect to='/login'/>;
		}
		return (
			<div>
				<NavBar
					history={props.history}
					loggedIn={props.userLogin.isLoggedIn}
					user={props.currentUser.user}
					location={props.location}
					actions={props.actions}
				/>
				<Form
					handleChange = {this.handleChange}
					handleSubmit = {this.handleSubmit}
					confirmPass = {this.confirmPass}
					username = {inputs.username} 
					email = {inputs.email}
					password ={inputs.password} 
					cpassword = {inputs.cpassword}
					first_name = {inputs.first_name}
					last_name = {inputs.last_name}
					loading= {inputs.loading}
					errors = {inputs.errors} 
				/>
			
			</div>
		);
	}
}

RegisterPage.propType = {
	currentUser: PropTypes.object.isRequired,
	loggedIn: PropTypes.bool.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	const {
		currentUser,
		registerUser,
		userLogin,		
	} = state;
	return {
		currentUser,
		registerUser,
		userLogin
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(RegisterUserActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
