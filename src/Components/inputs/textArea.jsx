import React from 'react';
import { PropTypes } from 'prop-types';

const TextArea = ({ name, label, disabled, rows, cols, required, onChange, value, error }) => {
	let formClass = 'form-control ';
	if (error && error.length > 0) {
		formClass += 'is-invalid';
	}
	return (
		<div className='form-group'>
			<label htmlFor={name}>{label}</label>
			<textarea 
				className={formClass}
				value={value}
				name={name}
				rows={rows}
				cols={cols}
				onChange={onChange}
				required={required}
				disabled={disabled}></textarea>
			{error && <small className="text-danger">{error}</small>}
		</div>
	);
};
TextArea.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	rows:  PropTypes.string,
	cols: PropTypes.string,
	value: PropTypes.string,
	error: PropTypes.array,
	required: PropTypes.string,
	disabled: PropTypes.string
};
export default TextArea;