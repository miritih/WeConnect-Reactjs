import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import InputField from '../inputs/InputField';
import Button from '../inputs/Button';

const RegisterForm = ({
	handleChange,
	handleSubmit,
	confirmPass,
	email,
	cpassword,
	first_name,
	last_name,
	errors,
	username,
	password,
	loading,
}) => {
	return (
		<div className="container wrapper">
			<div className="main-center">
				<div className="card">
					<div className="card-body">
						<h3>Create Account</h3>
						<form className="form" noValidate onSubmit={handleSubmit}>
							<InputField
								type="text"
								name="username"
								label="Username"
								onChange={handleChange}
								placeholder="username"
								value={username}
								error={errors.username}
							/>
							<InputField
								type="email"
								name="email"
								label="Email"
								onChange={handleChange}
								placeholder="email"
								value={email}
								error={errors.email}
							/>
							<InputField
								type="text"
								name="first_name"
								label="First Name"
								onChange={handleChange}
								placeholder="First Name"
								value={first_name}
								error={errors.first_name}
							/>
							<InputField
								type="text"
								name="last_name"
								label="Last Name"
								onChange={handleChange}
								placeholder="Last Name"
								value={last_name}
								error={errors.last_name}
							/>
							<InputField
								type="password"
								name="password"
								label="Password"
								onChange={handleChange}
								placeholder="password"
								value={password}
								error={errors.password}
							/>
							<InputField
								type="password"
								name="confirm_password"
								label="Confirm Password"
								onChange={confirmPass}
								placeholder="confirm password"
								value={cpassword}
								error={(cpassword !== password) ? ['Password mismatch'] : []}
							/>
							<Button
								type="submit"
								className="btn btn-lg btn-success btn-block btn-signin"
								loading={loading}
								text={loading ? 'Saving... ' : 'Register '}
								disabled={loading ? 'disabled' : null}
							/>
							<p className="message">Alredy registered? <Link to="/login">Signin</Link></p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
RegisterForm.propTypes = {
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	confirmPass: PropTypes.func.isRequired,
	username: PropTypes.string,
	password: PropTypes.string,
	cpassword: PropTypes.string,
	email: PropTypes.string,
	first_name: PropTypes.string,
	last_name: PropTypes.string,
};

RegisterForm.defaultProps = {
	username: '',
	password: '',
	cpassword: '',
	email: '',
	first_name: '',
	last_name: '',
};
export default RegisterForm;
