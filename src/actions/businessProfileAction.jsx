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
/**
 *
	* this action is to set change in store values
	* if you want to change anything in the store, then
	* dispatch this action with prop as the state to change
	* and the value as the new value
 * @param {*} prop - the field to update in store
 * @param {*} value - the value of the field
 */
export function inputChange({ prop, value }) {
	return {
		type: REVIEW_INPUT_CHANGE,
		payload: { prop, value },
	};
}
/**
 *
 * dispatch this action after a successful business fetch.
 * accepts parameter business, the business passed will then be passed to the reducer
 * @param {*} business - single business details.
 */
export function viewUserBusinessSuccess(business) {
	return {
		type: VIEW_BUSINESSES_PROFILE_SUCCESS,
		business,
	};
}
/**
 *this methods receives any error that occurs when fetching a business
 * @param {*} error - error received from the back end
 */
export function viewBusinessError(error) {
	return {
		type: LOAD_BUSINESS_PROFILE_ERROR,
		error,
	};
}
/**
 * method receives all business reviews
 * @param {*} reviews - all business reviews
 */
export function loadBusinessReviewsSuccess(reviews) {
	return {
		type: LOAD_BUSINESSES_REVIEWS_SUCCESS,
		reviews,
	};
}

/**
 * fetch all business reviews then
 * dispatch business success action on success or error on fail
 * @param {*} id - id of business to load
 */
export function loadBusinessReviews(id) {
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

/**
 *
 * @param {*} id - id of business to view
 */
export function viewUserBusiness(id) {
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
/**
 * function to add a new review to a business.
 * @param {*} review - the review body
 * @param {*} title  - Review title
 * @param {*} id - id of business to review.
 */
export function addReview({
	review, title, id,
}) {
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
