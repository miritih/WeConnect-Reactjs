import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import InputField from '../inputs/InputField';
import Button from '../inputs/Button';

const LoginForm = ({
	handleChange, handleSubmit, username, password, loading,
}) => {
	return (
		<div className="container wrapper">
			<div className="main-center">
				<div className="card">
					<div className="card-body">
						<img className="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="login" />
						<form className="form" onSubmit={handleSubmit}>
							<InputField
								type="text"
								name="username"
								label="Username"
								onChange={handleChange}
								placeholder="enter username"
								value={username}
								required="required"
							/>
							<InputField
								type="password"
								name="password"
								label="Password"
								required="required"
								onChange={handleChange}
								placeholder="enter password"
								value={password}
							/>
							<Button
								type="submit"
								className="btn btn-lg btn-success btn-block btn-signin"
								loading={loading}
								text={loading ? 'loading... ' : 'Login '}
								disabled={loading ? 'disabled' : null}
							/>
							<p className="message">Not registered? <Link to="/register">Create an account. </Link>
								<span> Forgot password?  <Link to="/forgotpass">Reset</Link> </span>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
LoginForm.propTypes = {
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	username: PropTypes.string,
	password: PropTypes.string,
};
LoginForm.defaultProps = {
	username: '',
	password: '',
};

export default LoginForm;
