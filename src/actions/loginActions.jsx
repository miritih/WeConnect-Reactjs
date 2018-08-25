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

export const inputChange = ({ prop, value }) => {
	return {
		type: LOGIN_INPUT_CHANGE,
		payload: { prop, value },
	};
};

export function isLoggedInSuccess(isLoggedIn) {
	return {
		type: IS_LOGGED_IN_SUCCESS,
		isLoggedIn,
	};
}

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
