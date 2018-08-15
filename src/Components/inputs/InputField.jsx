import React from 'react';
import { PropTypes } from 'prop-types';

const InputField = ({ name, type, label, disabled, required, onChange, placeholder, value, error }) => {
	let formClass = 'form-control ';
	if (error && error.length > 0) {
		formClass += 'is-invalid';
	}
	return (
		<div className='form-group'>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				className={formClass}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				required={required}
				disabled={disabled}
			/>
			{error && <small className="text-danger">{error}</small>}
		</div>
	);
};
InputField.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	error: PropTypes.array,
	required: PropTypes.string,
	disabled: PropTypes.string
};
export default InputField;