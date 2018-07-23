import axios from 'axios';
import { IS_REGISTRATION_SUCCESS, INPUT_CHANGE, REGISTER_USER, IS_REGISTRATION_FAILURE} from './actiontypes';
import { baseURL as url } from '../utils/Config';
import { notify } from '../utils/notify';

export const inputChange = ({ prop, value }) => {
	return {
		type: INPUT_CHANGE,
		payload: { prop, value },
	};
};

const registrationSuccess = (dispatch, response) => {
	dispatch({
		type: IS_REGISTRATION_SUCCESS,
		response
	});
};

const registrationFailure = (dispatch, errors) => {
	dispatch({
		type: IS_REGISTRATION_FAILURE,
		errors 
	});
};


export const registerUser = ({ username, email, first_name, last_name, password }) => {
	return (dispatch) => {
		dispatch({ type: REGISTER_USER });
		axios({
			method: 'post',
			url: 'auth/register',
			baseURL: url,
			data: {
				username,
				email,
				first_name,
				last_name,
				password,
			},
		})
			.then((response)=> {
				if (response.status >= 200 && response.status < 300) {
					registrationSuccess(dispatch, response);
					notify('success','Success', 'Your Account was successfully Created. Proceed to login');
				}
			}).catch((error) => {
				if (error.response !== undefined) {
					registrationFailure(dispatch, error.response.data['Errors']);
				}
				else {
					notify('error','Opps!!', 'Sorry! Something went wrong. If the problem persist, contact support');
				}
			});
	};
};