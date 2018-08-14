import {
	VIEW_BUSINESSES_PROFILE_SUCCESS,
	LOAD_BUSINESSES_REVIEWS_SUCCESS,
	LOAD_BUSINESS_PROFILE,
	LOAD_BUSINESS_PROFILE_ERROR
} from './actiontypes';
import axios from 'axios';
import { baseURL } from '../utils/Config';

export function viewUserBusinessSuccess(business){
	return {
		'type': VIEW_BUSINESSES_PROFILE_SUCCESS,
		business
	};
}
export function loadBusinessReviewsSuccess(business){
	return {
		'type': LOAD_BUSINESSES_REVIEWS_SUCCESS,
		business
	};
}


export function loadBusinessReviews(id) {
	return function (dispatch) {
		const url = 'businesses/'+id+'/reviews';
		dispatch({type: LOAD_BUSINESS_PROFILE});
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
				// dispatch(loadBusinessReviewsSuccess(response.data));
			}
		});
	};
}


export function viewUserBusinesses(id){
	return function (dispatch) {
		dispatch({type: LOAD_BUSINESS_PROFILE});
		const url = 'businesses/'+id;
		axios({
			method: 'get',
			url: url,
			baseURL: baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json'
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				dispatch(viewUserBusinessSuccess(response.data));
			}
		}).catch((error) => {
			if (error.response !== undefined) {
				dispatch({type: LOAD_BUSINESS_PROFILE_ERROR});
			}
		});
	};
}
