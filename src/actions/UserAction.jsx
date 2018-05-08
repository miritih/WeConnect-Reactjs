import * as types from './actiontypes';
import AuthService from '../Components/Auth/AuthService';

export function registerUser(user) {
	return {
		'type': types.REGISTER_USER,
		user
	};
}

export function loadUserSuccess(user) {
	return {
		'type': types.LOAD_USER_SUCCESS,
		user
	};
}

const Auth = new AuthService();
export function loadCurrentUser() {
	return function (dispatch) {
		return dispatch(loadUserSuccess(Auth.getUser()));
	};
}