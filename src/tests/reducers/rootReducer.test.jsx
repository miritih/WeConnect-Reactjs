import rootReducer from '../../reducers/index';
import { createStore} from 'redux';
import expect from 'expect';

describe('Login reducer', () => {
	it('should return the initial state', () => {
		let store = createStore(rootReducer);
		expect(store.getState().registerUser).toEqual({
			username: '',
			password: '',
			first_name: '',
			last_name: '',
			cpassword:'',
			email: '',
			errors: {},
			loading: false,
			redirect: false
		});
	});
});
