import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import Authservice from '../Auth/AuthService';
import { baseURL as url } from '../../utils/Config';
import Form from '../forms/RegisterForm';
import NavBar from '../common/NavBar';
import * as RegisterUserActions from '../../actions/UserAction';

class RegisterPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			cpassword: '',
			first_name: '',
			last_name: '',
			errors: {}
		};
		this.auth = new Authservice();
		this.handleChange = this.handleChange.bind(this);
		this.confirmPass = this.confirmPass.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}
	confirmPass(e) {
		this.setState({
			cpassword: e.target.value,
		});
	}
	handleSubmit(event) {
		event.preventDefault();
		const user = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			first_name: this.state.first_name,
			last_name: this.state.last_name,
		};

		axios({
			method: 'post',
			url: 'auth/register',
			data: user,
			baseURL: url,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json'
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				this.props.history.replace('/login');
				toast.success(() =>
					(<div>
						<h3>Success</h3>
						<p>Your Account was successfully Created<br />
							Login now with your username and password
						</p>
					</div>)
				);
			}
		}).catch((error) => {
			if (error.response !== undefined) {
				this.setState({ errors: error.response.data['Errors'] });
			}
			else {
				toast.error(() => <div>
					<h3>Opps!!</h3>
					<p>Sorry! Something went wrong. If the problem persist, contact support</p>
				</div>);
			}
		});
	}
	render() {
		const props = this.props;
		const state = this.state;
		return (
			<div>
				<NavBar
					history={props.history}
					loggedIn={props.loggedIn}
					user={props.currentUser.user}
					location={props.location}
					actions={props.actions}
				/>
				<Form
					handleChange = {this.handleChange}
					handleSubmit = {this.handleSubmit}
					confirmPass = {this.confirmPass}
					username = {state.username} 
					email = {state.email}
					password ={state.password} 
					cpassword = {state.cpassword}
					first_name = {state.first_name}
					last_name = {state.last_name}
					errors = {state.errors} 
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

function mapStateToProps(state, ownProps) {
	return {
		currentUser: state.activeUser, 
		loggedIn: state.loggedIn
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(RegisterUserActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
