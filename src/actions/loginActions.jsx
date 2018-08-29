import {
	IS_LOGGED_IN_SUCCESS,
	SET_LOGGED_IN_SUCCESS,
	LOGIN_INPUT_CHANGE,
	LOGIN_USER,
	IS_LOGGED_IN_FAILURE,
} from './actiontypes';
import AuthService from '../Components/Auth/AuthService';
import { notify } from '../utils/notify';
import { loadCurrentUser } from './UserAction';

const Auth = new AuthService();

/**
 * sets inputs value in store
 * @param {*} prop - name of the field to update in store.
 * @param {*} value -  the value of the field
 */
export const inputChange = ({ prop, value }) => {
	return {
		type: LOGIN_INPUT_CHANGE,
		payload: { prop, value },
	};
};
/**
 *
 * @param {*} isLoggedIn - sets true or false if user logged in or not
 */
export function isLoggedInSuccess(isLoggedIn) {
	return {
		type: IS_LOGGED_IN_SUCCESS,
		isLoggedIn,
	};
}
/**
 *
 * @param {*} isLoggedIn sets true or false if user logged in or not
 */
export function setLoggedInSuccess(isLoggedIn) {
	return {
		type: SET_LOGGED_IN_SUCCESS,
		isLoggedIn,
	};
}


export function isLoggedIn() {
	return function ds_dispatch(dispatch) {
		return dispatch(isLoggedInSuccess(Auth.isLoggedIn()));
	};
}
/**
 *
 * @param {*} username - login username
 * @param {*} password - user password
 */
export const loginUser = ({ username, password }) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER });
		Auth.login(username, password)
			.then((res) => {
				if (res.status >= 200 && res.status < 300) {
					// set logged in state
					dispatch(loadCurrentUser());
					dispatch(isLoggedIn());
					notify('success', 'Success', 'Logged in successfully');
				} else {
					dispatch({ type: IS_LOGGED_IN_FAILURE });
					notify('error', 'Opps!', 'Check your Username or password and try again');
				}
			})
			.catch(() => {
				notify('error', 'Error', 'Sorry! Something went wrong. If the problem persist, contact support');
			});
	};
};
