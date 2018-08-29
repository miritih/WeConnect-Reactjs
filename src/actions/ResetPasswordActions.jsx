/**
 * reset password actions
 */
import axios from 'axios';
import {
	RESET_PASS_INPUT_CHANGE,
	IS_PASSWORD_RESET_SUCCESS,
	IS_PASSWORD_RESET_ERROR,
	RESET_PASSWORD,
} from './actiontypes';
import { baseURL } from '../utils/Config';
import Authservice from '../Components/Auth/AuthService';
import { notify } from '../utils/notify';

const Auth = new Authservice();
/**
 * sets inputs value in store
 * @param {*} prop - name of the field to update in store.
 * @param {*} value -  the value of the field
 */
export const inputChange = ({ prop, value }) => {
	return {
		type: RESET_PASS_INPUT_CHANGE,
		payload: { prop, value },
	};
};
/**
 *
 * @param {*} password - details of the new password from back end
 */
export function resetPasswordSuccess(password) {
	return {
		type: IS_PASSWORD_RESET_SUCCESS,
		password,
	};
}
/**
 *
 * @param {*} error -  all errors that occurred on password reset from back end
 */
export function resetPasswordError(error) {
	return {
		type: IS_PASSWORD_RESET_ERROR,
		error,
	};
}
/**
 *
 * @param {*} old_password - old password that need to be changed
 * @param {*} password - the new password
 */
export const updatePassword = ({ old_password, password }) => {
	return function func(dispatch) {
		axios({
			method: 'put',
			url: 'auth/reset-password',
			data: { old_password, password },
			baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
				'access-token': Auth.getToken(),
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				dispatch(resetPasswordSuccess(response));
				notify('success', 'Success', 'Password reset successful');
			}
		}).catch((error) => {
			if (error.response !== undefined) {
				dispatch(resetPasswordError(error.response.data.Errors));
			} else {
				notify('error', 'Opps!!', 'Sorry! Something went wrong. If the problem persist, contact support');
			}
		});
	};
};

/**
 * if a user forgets their password they can request a new one via the email.
 * @param {*} email - the email of user who needs to receive a new password.
 */
export function resetPassword({ email }) {
	return function func(dispatch) {
		dispatch({ type: RESET_PASSWORD });
		return axios({
			method: 'put',
			url: `${baseURL}/auth/forgot-password`,
			data: { email },
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => {
			notify('success', 'Success', 'Password reset successful, check your email');
			dispatch(resetPasswordSuccess(res));
		})
			.catch((error) => {
				if (error.response !== undefined) {
					dispatch(resetPasswordError(error.response.data.Errors));
				}
			});
	};
}
