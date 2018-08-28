import axios from 'axios';
import {
	VIEW_BUSINESSES_PROFILE_SUCCESS,
	LOAD_BUSINESSES_REVIEWS_SUCCESS,
	LOAD_BUSINESS_PROFILE,
	LOAD_BUSINESS_PROFILE_ERROR,
	REVIEW_INPUT_CHANGE,
} from './actiontypes';
import { notify } from '../utils/notify';
import { baseURL } from '../utils/Config';
import Authservice from '../Components/Auth/AuthService';

const Auth = new Authservice();

export function inputChange({ prop, value }) {
	/**
	 * this action is to set change in store values
	 * if you want to change anything in the store, then
	 * dispatch this action with prop as the state to change
	 * and the value as the new value
	*/
	return {
		type: REVIEW_INPUT_CHANGE,
		payload: { prop, value },
	};
}

export function viewUserBusinessSuccess(business) {
	/**
	 * dispatch this action after a successful business fetch.
	 * accepts parameter business, the business passed will then be passed to the reducer
	 */
	return {
		type: VIEW_BUSINESSES_PROFILE_SUCCESS,
		business,
	};
}
export function viewBusinessError(error) {
	// this methods receives any error that occurs when fetching a business
	return {
		type: LOAD_BUSINESS_PROFILE_ERROR,
		error,
	};
}
export function loadBusinessReviewsSuccess(reviews) {
	// method receives all business reviews
	return {
		type: LOAD_BUSINESSES_REVIEWS_SUCCESS,
		reviews,
	};
}


export function loadBusinessReviews(id) {
	// fetch all business reviews
	//  then dispatch business success action on success or
	// error on fail
	return function disp(dispatch) {
		const url = `businesses/${id}/reviews`;
		dispatch({
			type: LOAD_BUSINESS_PROFILE,
		});
		axios({
			method: 'get',
			url,
			baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				//  on success dispatch success action
				dispatch(loadBusinessReviewsSuccess(response.data));
			}
		}).catch((error) => {
			if (error.response !== undefined) {
				// load the errors on error.
				dispatch(viewBusinessError(error.response.data));
			}
		});
	};
}


export function viewUserBusiness(id) {
	// fetch a single user business
	//  then dispatch business success action on success or
	// error on fail
	return function disp(dispatch) {
		dispatch({
			type: LOAD_BUSINESS_PROFILE,
		});
		const url = `businesses/${id}`;
		axios({
			method: 'get',
			url,
			baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				dispatch(viewUserBusinessSuccess(response.data));
			}
		}).catch((error) => {
			if (error.response !== undefined) {
				dispatch(viewBusinessError(error));
			}
		});
	};
}

export function addReview({
	review, title, id,
}) {
	// function to add a new review to a business.
	return function disp(dispatch) {
		const url = `businesses/${id}/reviews`;
		axios({
			method: 'post',
			url,
			data: {
				review,
				title,
			},
			baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
				'access-token': Auth.getToken(),
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				dispatch(loadBusinessReviews(id));
				notify('success', 'Success', 'Review added successfully');
			}
		}).catch((error) => {
			if (error.response !== undefined) {
				notify('error', 'Error', error.response.data.Error);
			}
		});
	};
}
