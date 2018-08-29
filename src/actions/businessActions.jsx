/**
 * This file contains all business functions to get
 * businesses from the back end api.
 */
import axios from 'axios';
import {
	LOAD_BUSINESSES_SUCCESS,
	LOAD_BUSINESS,
	ERROR,
} from './actiontypes';
import { baseURL } from '../utils/Config';

/**
 * action creator to for businesses
 * it get called when the load business action success
 * @param {*} businesses - all businesses from back end.
 */
export function loadBusinessesSuccess(businesses) {
	return {
		type: LOAD_BUSINESSES_SUCCESS,
		businesses,
	};
}

/**
 * loads businesses from the back end.
 * @param {*} page - pagination page
 * @param {*} query - search parameter
 */
export function loadBusinesses(page = 1, query = '') {
	return function load(dispatch) {
		const url = `businesses/search?limit=4&page=${page}&q=${query}`;
		dispatch({ type: LOAD_BUSINESS });
		axios({
			method: 'get',
			url,
			baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((response) => {
			// on success check if the response status is between 200 and 300 for success
			// if so dispatch action to load businesses
			if (response.status >= 200 && response.status < 300) {
				dispatch(loadBusinessesSuccess(response.data));
			}
		}).catch((error) => {
			if (error.response !== undefined) {
				dispatch({ type: ERROR });
			}
		});
	};
}
