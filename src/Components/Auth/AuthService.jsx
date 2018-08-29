/**
 * handles all authentication related logic
 */
import decode from 'jwt-decode';
import axios from 'axios';
import { baseURL } from '../../utils/Config';

export default class Authservice {
	constructor() {
		this.domain = baseURL;
	}

	/**
		 * method logs in a user.
		 * then returns a promise and adds token to the local storage
		 * @param {*} username
		 * @param {*} password
	*/
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
			this.setToken(response.data.auth_token); // add token
			return Promise.resolve(response); // return a promise
		}).catch((error) => {
			return Promise.resolve(error.response);
		});
	}

	/**
	 * get token from local storage
  */
	getToken() {
		try {
			return window.localStorage.getItem('auth_token');
		} catch (e) {
			return false;
		}
	}

	/**
	 * add token to local storage
	 * @param {*} token
	 */
	setToken(token) {
		return window.localStorage.setItem('auth_token', token);
	}

	/**
	 * log user out
	 * Clear the token from local storage
	 *
	*/
	logout() {
		window.localStorage.removeItem('auth_token'); // Clear user token from localStorage
	}

	/**
 		* decode token to get username
	*/
	getUser() {
		if (this.getToken()) {
			return decode(this.getToken());
		}
		return [];
	}

	/**
	 * Checks if there is a saved token and it's still valid
  */
	isLoggedIn() {
		const token = this.getToken(); // Getting token from local storage
		return !!token && !this.isTokenExpired(token);
	}

	/**
	 * checks if token is expired
	 * @param {*} token
	*/
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
