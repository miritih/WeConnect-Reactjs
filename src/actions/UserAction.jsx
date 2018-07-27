import {LOAD_USER_SUCCESS, UPDATE_CURRENT_USER,
	PROFILE_INPUT_CHANGE, 
	UPDATE_PROFILE, 
	UPDATE_PROFILE_SUCCESS
} from './actiontypes';
import AuthService from '../Components/Auth/AuthService';
import axios from 'axios';
import { baseURL } from '../utils/Config';
import { notify } from '../utils/notify';

export const inputChange = ({ prop, value }) => {
	return {
		type: PROFILE_INPUT_CHANGE,
		payload: { prop, value },
	};
};

export function loadUserSuccess(user) {
	return {
		'type': LOAD_USER_SUCCESS,
		user
	};
}

export function updateUserSuccess(user){
	return{
		'type': UPDATE_CURRENT_USER,
		user
	};
}

export const updateProfileSuccess = (payload) => {
	return {
		type: UPDATE_PROFILE_SUCCESS,
		payload
	};
};

const Auth = new AuthService();
export function loadCurrentUser() {
	return function (dispatch) {
		axios({
			method: 'get',
			url: 'auth/get-user',
			baseURL: baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
				'access-token': Auth.getToken()
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
				dispatch(updateUserProfile({email, username, first_name, last_name, image}));
			}
		});
	};
}
export const updateUserProfile = ({email, username, image, first_name, last_name}) => {
	return (dispatch) => {
		const user = {
			email, username, image, first_name, last_name
		};
		dispatch(updateUserSuccess(user));
	};
};

export const updateUser = ({ email, image, first_name, last_name }) => {
	return (dispatch) => {
		dispatch({ type: UPDATE_PROFILE});
		const user = {
			email: email,
			image: image,
			first_name: first_name,
			last_name: last_name
		};
		
		axios({
			method: 'put',
			url: 'auth/update-profile',
			data: user,
			baseURL: baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
				'access-token': Auth.getToken()
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				dispatch(loadCurrentUser());
				dispatch(updateProfileSuccess(response.data));
				notify('success', 'Success', 'Your Profile was successfully updated');
			}
		});
	};
};