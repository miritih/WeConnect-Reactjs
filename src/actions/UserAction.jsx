/**
 * user profile actions
 */
import axios from 'axios';
import {
	LOAD_USER_SUCCESS, UPDATE_CURRENT_USER,
	PROFILE_INPUT_CHANGE,
	UPDATE_PROFILE,
	UPDATE_PROFILE_SUCCESS,
} from './actiontypes';
import AuthService from '../Components/Auth/AuthService';
import { baseURL } from '../utils/Config';
import { notify } from '../utils/notify';

/**
 * sets inputs value in store
 * @param {*} prop - name of the field to update in store.
 * @param {*} value -  the value of the field
 */
export const inputChange = ({ prop, value }) => ({
	type: PROFILE_INPUT_CHANGE,
	payload: { prop, value },
});
/**
 *
 * @param {*} user - details of logged in user
 */
export function loadUserSuccess(user) {
	return {
		type: LOAD_USER_SUCCESS,
		user,
	};
}
/**
 *
 * @param {*} user  details of updated user
 */
export function updateUserSuccess(user) {
	return {
		type: UPDATE_CURRENT_USER,
		user,
	};
}
/**
 *
 * @param {*} payload - details of the user that were updated
 */
export function updateProfileSuccess(payload) {
	return {
		type: UPDATE_PROFILE_SUCCESS,
		payload,
	};
}

const Auth = new AuthService();
/**
 * method updates the details of a user.
 * to update all the following params are required
 * @param {*} email
 * @param {*} username
 * @param {*} image
 * @param {*} first_name
 * @param {*} last_name
 */
export const updateUserProfile = ({
	email, username, image, first_name, last_name,
}) => (dispatch) => {
	const user = {
		email, username, image, first_name, last_name,
	};
	dispatch(updateUserSuccess(user));
};
/**
 * gets the details of the current logged in user
 */
export function loadCurrentUser() {
	return function dispatchFunc(dispatch) {
		axios({
			method: 'get',
			url: 'auth/get-user',
			baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
				'access-token': Auth.getToken(),
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				const {
					email,
					username,
					first_name,
					last_name,
					image,
				} = response.data;
				dispatch(updateUserProfile({
					email, username, first_name, last_name, image,
				}));
			}
		});
	};
}
/**
 *updated user
 * @param {*} email
 * @param {*} image
 * @param {*} first_name
 * @param {*} last_name
 */
export const updateUser = ({
	email, image, first_name, last_name,
}) => (dispatch) => {
	dispatch({ type: UPDATE_PROFILE });
	const user = {
		email,
		image,
		first_name,
		last_name,
	};

	axios({
		method: 'put',
		url: 'auth/update-profile',
		data: user,
		baseURL,
		responseType: 'json',
		headers: {
			'Content-Type': 'application/json',
			'access-token': Auth.getToken(),
		},
	}).then((response) => {
		if (response.status >= 200 && response.status < 300) {
			dispatch(loadCurrentUser());
			dispatch(updateProfileSuccess(response.data));
			notify('success', 'Success', 'Your Profile was successfully updated');
		}
	});
};
