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
	return {
		type: REVIEW_INPUT_CHANGE,
		payload: { prop, value },
	};
}

export function viewUserBusinessSuccess(business) {
	return {
		type: VIEW_BUSINESSES_PROFILE_SUCCESS,
		business,
	};
}
export function viewBusinessError(error) {
	return {
		type: LOAD_BUSINESS_PROFILE_ERROR,
		error,
	};
}
export function loadBusinessReviewsSuccess(reviews) {
	return {
		type: LOAD_BUSINESSES_REVIEWS_SUCCESS,
		reviews,
	};
}


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
				dispatch(loadBusinessReviewsSuccess(response.data));
			}
		}).catch((error) => {
			if (error.response !== undefined) {
				dispatch(viewBusinessError(error.response.data));
			}
		});
	};
}


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
				notify('success', 'Success', 'Review added successfully');
				// dispatch(addReviewSuccess(response.data));
			}
		}).catch((error) => {
			if (error.response !== undefined) {
				notify('error', 'Success', error.response.data.Error);
				dispatch(viewBusinessError(error));
				// dispatch(addReviewError(error));
			}
		});
	};
}
