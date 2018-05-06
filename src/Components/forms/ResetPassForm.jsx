import React from 'react';
import axios from 'axios';
import Authservice from '../Auth/AuthService';
import { baseURL } from '../../utils/Config';
import { toast } from 'react-toastify';

class ResetPassForm extends React.Component {
	constructor() {
		super();
		this.state = {
			old_password: '',
			new_password: '',
			confirm_password: '',
			errors: []
		};
		this.Auth = new Authservice();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleSubmit(event) {
		event.preventDefault();
		const data = {
			password: this.state.new_password,
			old_password: this.state.old_password
		};
		axios({
			method: 'put',
			url: 'auth/reset-password',
			data: data,
			baseURL: baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
				'access-token': this.Auth.getToken()
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				this.setState({
					errors: '',
					new_password: '',
					old_password: '',
					confirm_password: ''
				});
				toast.success(() => <div>
					<h3>Success</h3>
					<p>Password reset successful<br/>
					</p>
				</div>);
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
			<form onSubmit={this.handleSubmit}>
				<label htmlFor="old_password" >Old Password</label>
				<input
					type="password"
					required
					value= {this.state.old_password}
					className={'form-control ' + (
						this.state.errors['old_password'] === undefined ? '' : 'is-invalid'
					)}
					name="old_password"
					onChange={this.handleChange}/>
				{(this.state.errors['old_password'] !== undefined) && (<small className="text-danger">
					{this.state.errors['old_password']}
					<br/>
				</small> )
				} 
				<br/>
				<label htmlFor="new_password">New Password</label>
				<input
					type="password"
					required
					className={'form-control ' + (
						this.state.errors['password'] === undefined ? '' : 'is-invalid')}
					name="new_password"
					value= {this.state.new_password}
					onChange={this.handleChange}/>
				{(this.state.errors['password'] !== undefined) && (<small className="text-danger">
					{this.state.errors['password'].join()}<br/>
				</small> )}  
				<br/>
				<label htmlFor="confirm_password">Confirm Password</label>
				<input 
					type="password"
					value= {this.state.confirm_password}
					className={'form-control ' + 
										(this.state.confirm_password !== this.state.new_password ? 'is-invalid' : '')}
					name="confirm_password"
					onChange={this.handleChange}/>
				{(this.state.confirm_password !== this.state.new_password) && (<small className="text-danger">
					Password mismatch
					<br/>
				</small>)}
				<br/>
				<br/>
				<button type="submit" className="btn btn-primary">Reset Password</button>
			</form>);}
}
export default ResetPassForm;
