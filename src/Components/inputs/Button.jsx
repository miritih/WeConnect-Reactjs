import React from 'react';
import { PropTypes } from 'prop-types';

const Button = ({ type, loading, className, text, disabled }) => {
	return (
		<button
			type={type}
			className={className}
			disabled={disabled}>
			{loading ? <span>{text}<img src='/img/16x16.gif' alt={text}/></span> : text }
		</button>
	);
};
Button.propTypes = {
	type: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	loading: PropTypes.bool,
	disabled: PropTypes.string,
};
export default Button;