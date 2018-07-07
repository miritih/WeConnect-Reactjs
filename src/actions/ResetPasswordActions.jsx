import * as types from './actiontypes';
import { baseURL } from '../utils/Config';
import axios from 'axios';

export function resetPasswordSucess(password) {
	return {
		'type': types.IS_PASSWORD_RESET_SUCESS,
		password
	};
}
export function resetPasswordError(error) {
	return {
		'type': types.IS_PASSWORD_RESET_ERROR,
		error
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
			dispatch(resetPasswordSucess(res))
		).catch(error =>
			dispatch(resetPasswordError(error.response))
		);
	};
}