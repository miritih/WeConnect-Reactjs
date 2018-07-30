import {
	LOAD_USER_BUSINESS,
	LOAD_USER_BUSINESSES_SUCCESS
} from './actiontypes';
import axios from 'axios';
import { baseURL } from '../utils/Config';
import Authservice from '../Components/Auth/AuthService';


const Auth = new Authservice();
export function loadUserBusinessesSuccess(businesses){
	return {
		'type': LOAD_USER_BUSINESSES_SUCCESS,
		businesses
	};
}

export function loadUserBusinesses(page=1, query='') {
	return function (dispatch) {
		const url = 'businesses/user?limit=10&page='+page+'&q='+query;
		dispatch({type: LOAD_USER_BUSINESS});
		axios({
			method: 'get',
			url: url,
			baseURL: baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
				'access-token': Auth.getToken()
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				dispatch(loadUserBusinessesSuccess(response.data));
			}
		});
	};
}
