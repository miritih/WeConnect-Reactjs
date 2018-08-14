import axios from 'axios';
import { 
	BUSINESS_REGISTRATION_SUCCESS, 
	BUSINESS_INPUT_CHANGE, 
	BUSINESS_REGISTRATION_FAILURE,
	REGISTER_BUSINESS
} from './actiontypes';
import { baseURL as url } from '../utils/Config';
import { notify } from '../utils/notify';
import Authservice from '../Components/Auth/AuthService';

const Auth = new Authservice();

export const inputChange = ({ prop, value }) => {
	return {
		type: BUSINESS_INPUT_CHANGE,
		payload: { prop, value },
	};
};

export const registrationSuccess = (response) => {
	return {
		type: BUSINESS_REGISTRATION_SUCCESS,
		response
	};
};

export const registrationFailure = (errors) => {
	return {
		type: BUSINESS_REGISTRATION_FAILURE,
		errors 
	};
};


export const registerBusiness = ({ name, location, category, description, logo }) => {
	return (dispatch) => {
		dispatch({ type: REGISTER_BUSINESS });
		axios({
			method: 'post',
			url: 'businesses',
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
				'access-token': Auth.getToken()
			},
		})
			.then((response)=> {
				if (response.status >= 200 && response.status < 300) {
					dispatch(registrationSuccess(response));
					notify('success','Success', 'Business Created successfully');
				}
			}).catch((error) => {
				if (error.response !== undefined) {
					dispatch(registrationFailure(error.response.data['Errors']));
				}
				else {
					notify('error','Opps!!', 'Sorry! Something went wrong. If the problem persist, contact support');
				}
			});
	};
};