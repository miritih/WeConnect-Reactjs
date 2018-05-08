import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Authservice from '../Auth/AuthService';
import { baseURL as url } from '../../utils/Config';
import InputField from '../inputs/InputField';


class RegisterForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			cpassword: '',
			first_name: '',
			last_name: '',
			errors: {},
		};
		this.auth = new Authservice();
		this.handleChange = this.handleChange.bind(this);
		this.confirmPass = this.confirmPass.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		if (this.auth.isLoggedIn()) {
			//this.props.history.replace('/');
		}
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
		return (
			<div className="container wrapper">
				<div className="main-center">
					<div className="card">
						<div className="card-body">
							<h3>Create Account</h3>
							<form className="form" noValidate onSubmit={this.handleSubmit}>
								<InputField
									type='text'
									name='username'
									label='Username'
									onChange={this.handleChange}
									placeholder='username'
									value={this.state.username}
									error={this.state.errors['username']}
								/>
								<InputField
									type='email'
									name='email'
									label='Email'
									onChange={this.handleChange}
									placeholder='email'
									value={this.state.email}
									error={this.state.errors['email']}
								/>
								<InputField
									type='text'
									name='first_name'
									label='First Name'
									onChange={this.handleChange}
									placeholder='First Name'
									value={this.state.first_name}
									error={this.state.errors['first_name']}
								/>
								<InputField
									type='text'
									name='last_name'
									label='Last Name'
									onChange={this.handleChange}
									placeholder='Last Name'
									value={this.state.last_name}
									error={this.state.errors['last_name']}
								/>
								<InputField
									type='password'
									name='password'
									label='Password'
									onChange={this.handleChange}
									placeholder='password'
									value={this.state.password}
									error={this.state.errors['password']}
								/>
								<InputField
									type='password'
									name='confirm_password'
									label='Confirm Password'
									onChange={this.confirmPass}
									placeholder='confirm password'
									value={this.state.cpassword}
									error={(this.state.cpassword !== this.state.password) && 'Password mismatch'}
								/>
								<button
									type="submit"
									className="btn btn-lg btn-success btn-block btn-signin">Register
								</button>
								<p className="message">Alredy registered? <Link to="/login">Signin</Link></p>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RegisterForm;
