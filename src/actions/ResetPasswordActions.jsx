import {
	RESET_PASS_INPUT_CHANGE,
	IS_PASSWORD_RESET_SUCCESS,
	IS_PASSWORD_RESET_ERROR
} from './actiontypes';
import { baseURL } from '../utils/Config';
import axios from 'axios';
import Authservice from '../Components/Auth/AuthService';
import { notify } from '../utils/notify';

const Auth = new Authservice();
export const inputChange = ({prop, value}) => {
	return{
		type: RESET_PASS_INPUT_CHANGE,
		payload: { prop, value }
	};
};
export function resetPasswordSuccess(password) {
	return {
		type: IS_PASSWORD_RESET_SUCCESS,
		password
	};
}
export function resetPasswordError(error) {
	return {
		type: IS_PASSWORD_RESET_ERROR,
		error
	};
}

export const updatePassword = ({old_password, password}) =>{
	return function(dispatch){
		axios({
			method: 'put',
			url: 'auth/reset-password',
			data: {old_password, password},
			baseURL: baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
				'access-token': Auth.getToken()
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				dispatch(resetPasswordSuccess(response));
				notify('success', 'Success', 'Password reset successful');
			}
		}).catch((error) => {
			if (error.response !== undefined) {
				dispatch(resetPasswordError(error.response.data['Errors']));
			}
			else {
				console.log(error);
				notify('error', 'Opps!!', 'Sorry! Something went wrong. If the problem persist, contact support');
			}
		});
	};
}


export function resetPassword(email) {
	return function (dispatch) { 
		const data = {
			'email': email,
		};
		return axios({
			method: 'put',
			url: baseURL + '/auth/forgot-password',
			data: data,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json'
			},
		}).then(res =>
			// do the dispatch here
			dispatch(resetPasswordSuccess(res))
		).catch(error =>
			dispatch(resetPasswordError(error.response))
		);
	};
}