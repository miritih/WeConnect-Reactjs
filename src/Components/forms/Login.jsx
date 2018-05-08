import React, { Component } from 'react';
import Authservice from '../Auth/AuthService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import InputField from '../inputs/InputField';

class LoginForm extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		};
		this.auth = new Authservice();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		this.auth.login(this.state.username, this.state.password)
			.then(res => {
				if (res.status >= 200 && res.status < 300) {
					this.props.history.replace('/');
					toast.success(({ closeToast }) => <div>
						<h3>Success</h3>
						<p>Logged in successfully</p>
					</div>);
				}
				else {
					this.setState({
						username: '',
						password: ''
					});
					// create the error message container
					// this willl be shown in our notification
					toast.error(({ closeToast }) =>
						<div>
							<h3>Opps!!</h3>
							<p>Wrong Username or password entered</p>
						</div>
					);
				}
			})
			.catch(err => {
				toast.error(({ closeToast }) => <div>
					<h3>Opps!!</h3>
					<p>Sorry! Something went wrong. If the problem persist, contact support</p>
				</div>);
			});
	}
	componentWillMount() {
		if (this.auth.isLoggedIn())
			this.props.history.replace('/');
	}
	render() {
		return (
			<div className="container wrapper">
				<div className="main-center">
					<div className="card">
						<div className="card-body">
							<img className="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="login" />
							<p id="profile-name" className="profile-name-card"></p>
							<form className="form" onSubmit={this.handleSubmit}>
								<InputField
									type='text'
									name='username'
									label='Username'
									onChange={this.handleChange}
									placeholder='enter username'
									value={this.state.username}
									required='required'
								/>
								<InputField
									type='password'
									name='password'
									label='Password'
									required='required'
									onChange={this.handleChange}
									placeholder='enter password'
									value={this.state.password}
								/>
								<button
									type="submit"
									className="btn btn-lg btn-success btn-block btn-signin">
									Login
								</button>
								<p className="message">Not registered? <Link to="/register">Create an account</Link></p>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginForm;
