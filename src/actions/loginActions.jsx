import * as types from './actiontypes';
import AuthService from '../Components/Auth/AuthService';

export function isLoggedInSuccess(isLoggedIn) {
	return {
		'type': types.IS_LOGGED_IN_SUCCESS,
		isLoggedIn
	};
}
export function setLoggedInSuccess(isLoggedIn) {
	return {
		'type': types.SET_LOGGED_IN_SUCCESS,
		isLoggedIn
	};
}

const Auth = new AuthService();
export function isLoggedIn() {
	return function (dispatch) {
		return dispatch(isLoggedInSuccess(Auth.isLoggedIn()));
	};
}

export function setLoggedIn() {
	return function (dispatch) {
		return dispatch(setLoggedInSuccess(Auth.isLoggedIn()));
	};
}