import {
	LOAD_BUSINESSES_SUCCESS,
	LOAD_BUSINESS
} from './actiontypes';
import axios from 'axios';
import { baseURL } from '../utils/Config';


export function loadBusinessesSuccess(businesses) {
	return {
		'type': LOAD_BUSINESSES_SUCCESS,
		businesses
	};
}


export function loadBusinesses(page=1, query='') {
	return function (dispatch) {
		const url = 'businesses/search?limit=4&page='+page+'&q='+query;
		dispatch({type: LOAD_BUSINESS});
		axios({
			method: 'get',
			url: url,
			baseURL: baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				dispatch(loadBusinessesSuccess(response.data));
			}
		});
	};
}
