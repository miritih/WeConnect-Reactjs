import React from 'react';
import { PropTypes } from 'prop-types';
import InputField from '../inputs/InputField';
import Button from '../inputs/Button';
/**
 *
 * @param {*} handleChange
 * @param {*} handleSubmit
 * @param {*} old_password
 * @param {*} new_password
 * @param {*} confirm_password
 * @param {*} errors
 * @param {*} loading
 */
const ResetPassForm = ({
	handleChange,
	handleSubmit,
	old_password,
	new_password,
	confirm_password,
	errors,
	loading,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<InputField
				type="password"
				name="old_password"
				label="Old Password"
				onChange={handleChange}
				placeholder="enter old password"
				required="required"
				value={old_password}
				error={errors.old_password}
			/>
			<InputField
				type="password"
				name="new_password"
				label="New Password"
				onChange={handleChange}
				placeholder="Enter new password"
				required="required"
				value={new_password}
				error={errors.password}
			/>
			<InputField
				type="password"
				name="confirm_password"
				label="Confirm Password"
				onChange={handleChange}
				placeholder="Confirm new Password"
				required="required"
				value={confirm_password}
				error={(confirm_password !== new_password) ? ['Password mismatch'] : []}
			/>

			<Button
				type="submit"
				className="btn btn-primary"
				loading={loading}
				text={loading ? 'Saving... ' : 'Update Password '}
				disabled={loading ? 'disabled' : null}
			/>
		</form>
	);
};

ResetPassForm.propTypes = {
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	confirm_password: PropTypes.string,
	old_password: PropTypes.string,
	new_password: PropTypes.string,
	errors: PropTypes.array,
	loading: PropTypes.bool,
};

ResetPassForm.defaultProps = {
	confirm_password: '',
	old_password: '',
	new_password: '',
	errors: [],
	loading: false,
};

export default ResetPassForm;
