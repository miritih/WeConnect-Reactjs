import { createStore } from 'redux';
import expect from 'expect';
import rootReducer from '../../reducers/index';

describe('Login reducer', () => {
	it('should return the initial state', () => {
		const store = createStore(rootReducer);
		expect(store.getState().registerUser).toEqual({
			username: '',
			password: '',
			first_name: '',
			last_name: '',
			cpassword: '',
			email: '',
			errors: {},
			loading: false,
			redirect: false,
		});
	});
});
