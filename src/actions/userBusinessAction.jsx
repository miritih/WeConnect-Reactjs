import axios from 'axios';
import {
	LOAD_USER_BUSINESS,
	LOAD_USER_BUSINESSES_SUCCESS,
	DELETE_USER_BUSINESSES_SUCCESS,
} from './actiontypes';
import { baseURL } from '../utils/Config';
import { notify } from '../utils/notify';
import Authservice from '../Components/Auth/AuthService';


const Auth = new Authservice();
export function loadUserBusinessesSuccess(businesses) {
	return {
		type: LOAD_USER_BUSINESSES_SUCCESS,
		businesses,
	};
}

export function deleteUserBusinessesSuccess(business) {
	return {
		type: DELETE_USER_BUSINESSES_SUCCESS,
		business,
	};
}


export function loadUserBusinesses(page = 1, query = '') {
	return function func(dispatch) {
		const url = `businesses/user?limit=10&page=${page}&q=${query}`;
		dispatch({ type: LOAD_USER_BUSINESS });
		axios({
			method: 'get',
			url,
			baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
				'access-token': Auth.getToken(),
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				dispatch(loadUserBusinessesSuccess(response.data));
			}
		});
	};
}

export function deleteUserBusinesses(id) {
	return function func(dispatch) {
		const url = `businesses/${id}`;
		dispatch({ type: LOAD_USER_BUSINESS });
		axios({
			method: 'delete',
			url,
			baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
				'access-token': Auth.getToken(),
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				dispatch(deleteUserBusinessesSuccess(response.data));
				dispatch(loadUserBusinesses());
				notify('success', 'Success', 'Business Deleted Successfully');
			}
		});
	};
}
