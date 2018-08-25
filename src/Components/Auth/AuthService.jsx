import decode from 'jwt-decode';
import axios from 'axios';
import { baseURL } from '../../utils/Config';

export default class Authservice {
	constructor() {
		this.domain = baseURL;
	}

	login(username, password) {
		const data = {
			username,
			password,
		};
		return axios({
			method: 'post',
			url: `${this.domain}/auth/login`,
			data,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((response) => {
			this.setToken(response.data.auth_token);
			return Promise.resolve(response);
		}).catch((error) => {
			return Promise.resolve(error.response);
		});
	}

	getToken() {
		try {
			return window.localStorage.getItem('auth_token');
		} catch (e) {
			return false;
		}
	}

	setToken(token) {
		return window.localStorage.setItem('auth_token', token);
	}

	logout() {
		// Clear user token from localStorage
		window.localStorage.removeItem('auth_token');
	}

	getUser() {
		// decode token to get username
		if (this.getToken()) {
			return decode(this.getToken());
		}
		return [];
	}

	isLoggedIn() {
		// Checks if there is a saved token and it's still valid
		const token = this.getToken(); // GEtting token from localstorage
		return !!token && !this.isTokenExpired(token);
	}

	isTokenExpired(token) {
		try {
			const { exp } = decode(token);
			if (exp < Date.now() / 1000) { // Checking if token is expired.
				return true;
			}
			return false;
		} catch (err) {
			return false;
		}
	}
}
