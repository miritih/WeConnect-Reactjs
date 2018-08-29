/**
 * component generates HTML button with bootstrap styling
 */
import React from 'react';
import { PropTypes } from 'prop-types';
/**
 * presentation component to create a button
 * @param {*} type type of button ie submit
 * @param {*} loading true of false if data still loading
 * @param {*} className class to style
 * @param {*} text text to display
 * @param {*} disabled disabled to disable button
 */
const Button = ({
	type, loading, className, text, disabled,
}) => {
	return (
		<button
			type={type}
			className={className}
			disabled={disabled}
		>
			{loading ? <span>{text}<img src="/img/16x16.gif" alt={text} /></span> : text }
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
Button.defaultProps = {
	loading: false,
	disabled: null,
};
export default Button;
