import axios from 'axios';
import {
	LOAD_USER_BUSINESS,
	LOAD_USER_BUSINESSES_SUCCESS,
	DELETE_USER_BUSINESSES_SUCCESS,
	ERROR,
} from './actiontypes';
import { baseURL } from '../utils/Config';
import { notify } from '../utils/notify';
import Authservice from '../Components/Auth/AuthService';


const Auth = new Authservice();
/**
 * 	action get dispatched after a successful businesses GET
 * @param {*} businesses - details of all registered businesses fetched from back end
 */
export function loadUserBusinessesSuccess(businesses) {
	return {
		type: LOAD_USER_BUSINESSES_SUCCESS,
		businesses,
	};
}
/**
 * dispatch on business delete success
 * @param {*} business details of deleted business
 */
export function deleteUserBusinessesSuccess(business) {
	return {
		type: DELETE_USER_BUSINESSES_SUCCESS,
		business,
	};
}
/**
 * this methods loads all businesses and implements
	* search and pagination.
	* to paginate the function received the page and loads current
	* businesses from the server
	* To search the function receives a query parameter
 * @param {*} page
 * @param {*} query
 */
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
				// dispatch loadUserBusinessesSuccess on success
				dispatch(loadUserBusinessesSuccess(response.data));
			}
		}).catch((error) => {
			if (error.response !== undefined) {
				dispatch({ type: ERROR });
			}
		});
	};
}
/**
 * delete a business
 * @param {*} id id of business to delete
 */
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
				//  on delete success load businesses and dispatch success action
				dispatch(deleteUserBusinessesSuccess(response.data));
				dispatch(loadUserBusinesses());
				notify('success', 'Success', 'Business Deleted Successfully');
			}
		}).catch((error) => {
			if (error.response !== undefined) {
				// dispatch error
				dispatch({ type: ERROR });
			}
		});
	};
}
