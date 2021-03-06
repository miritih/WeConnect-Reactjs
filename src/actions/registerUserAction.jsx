/**
 * all register user actions
 */
import axios from 'axios';
import {
	IS_REGISTRATION_SUCCESS, INPUT_CHANGE, REGISTER_USER, IS_REGISTRATION_FAILURE,
} from './actiontypes';
import { baseURL as url } from '../utils/Config';
import { notify } from '../utils/notify';

export const inputChange = ({ prop, value }) => {
	return {
		type: INPUT_CHANGE,
		payload: { prop, value },
	};
};
/**
 *
 * @param {*} response - response contains registered user details.
 */
export const registrationSuccess = (response) => {
	return {
		type: IS_REGISTRATION_SUCCESS,
		response,
	};
};
/**
 *
 * @param {*} errors all errors that occured in back end
 */
export const registrationFailure = (errors) => {
	return {
		type: IS_REGISTRATION_FAILURE,
		errors,
	};
};

/**
 * function to register users
 * this user details are all required to register a user.
 * @param {*} username
 * @param {*} email
 * @param {*} first_name
 * @param {*} last_name
 * @param {*} password
 */
export const registerUser = ({
	username, email, first_name, last_name, password,
}) => {
	return (dispatch) => {
		dispatch({ type: REGISTER_USER });
		axios({
			method: 'post',
			url: 'auth/register',
			baseURL: url,
			data: {
				username,
				email,
				first_name,
				last_name,
				password,
			},
		})
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					dispatch(registrationSuccess(response));
					notify('success', 'Success', 'Your Account was successfully Created. Proceed to login');
				}
			}).catch((error) => {
				if (error.response !== undefined) {
					dispatch(registrationFailure(error.response.data.Errors));
				} else {
					notify('error', 'Opps!!', 'Sorry! Something went wrong. If the problem persist, contact support');
				}
			});
	};
};
