import axios from 'axios';
import {
	BUSINESS_REGISTRATION_SUCCESS,
	BUSINESS_INPUT_CHANGE,
	BUSINESS_REGISTRATION_FAILURE,
	REGISTER_BUSINESS,
	FETCH_BUSINESS_SUCCESS,
	ON_MODAL_CLOSE,
	ERROR,
} from './actiontypes';
import { baseURL as url } from '../utils/Config';
import { notify } from '../utils/notify';
import Authservice from '../Components/Auth/AuthService';
import { loadUserBusinesses } from './userBusinessAction';

// create auth object. the object will be used to get token from local storage
const Auth = new Authservice();

export const inputChange = ({ prop, value }) => {
	// change input values in the store
	return {
		type: BUSINESS_INPUT_CHANGE,
		payload: { prop, value },
	};
};

export const registrationSuccess = (response) => {
	return {
		type: BUSINESS_REGISTRATION_SUCCESS,
		response,
	};
};

export const registrationFailure = (errors) => {
	return {
		type: BUSINESS_REGISTRATION_FAILURE,
		errors,
	};
};
export const fetchBusinessSuccess = (business) => {
	return {
		type: FETCH_BUSINESS_SUCCESS,
		business,
	};
};
export const onclose = () => {
	return {
		type: ON_MODAL_CLOSE,
	};
};


export const registerBusiness = ({
	name, location, category, description, logo, id = null,
}) => {
	/**
	 * method is used to create or update business
	 * If the value of id is not null then update else create business
	 */
	return (dispatch) => {
		let endpoint;
		id !== null ? endpoint = `businesses/${id}` : endpoint = 'businesses';
		dispatch({ type: REGISTER_BUSINESS });
		axios({
			method: id !== null ? 'put' : 'post',
			url: endpoint,
			baseURL: url,
			data: {
				name,
				location,
				category,
				description,
				logo,
			},
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
				'access-token': Auth.getToken(),
			},
		})
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					// on success load businesses again to reload the page
					dispatch(registrationSuccess(response));
					dispatch(loadUserBusinesses());
					notify('success', 'Success', id !== null ? 'Business updated successfully' : 'Business Created successfully');
				}
			}).catch((error) => {
				if (error.response !== undefined) {
					dispatch(registrationFailure(error.response.data.Errors));
				} else {
					notify('error', 'Opps!!', 'Sorry! Something went wrong. If the problem persist, contact support');
				}
			});
	};
};

export function fetchBusiness(id) {
	return function func(dispatch) {
		/**
		 * fetch a business
		 */
		dispatch({ type: REGISTER_BUSINESS });
		const endpoint = `businesses/${id}`;
		axios({
			method: 'get',
			url: endpoint,
			baseURL: url,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				dispatch(fetchBusinessSuccess(response.data));
			}
		}).catch((error) => {
			if (error.response !== undefined) {
				dispatch({ type: ERROR });
			}
		});
	};
}
