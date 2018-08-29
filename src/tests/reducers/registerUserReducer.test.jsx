import expect from 'expect';
import reducer from '../../reducers/registerUserReducer';
import * as types from '../../actions/actiontypes';

describe('Login reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
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
	it('should handle INPUT_CHANGE', () => {
		expect(
			reducer([], {
				type: types.INPUT_CHANGE,
				payload: { prop: 'password', value: 'egweg2378' },
			}),
		).toEqual({ loading: false, password: 'egweg2378' });
	});

	it('should handle REGISTER_USER', () => {
		expect(
			reducer([], {
				type: types.REGISTER_USER,
			}),
		).toEqual({ redirect: false, loading: true });
	});

	it('should handle IS_REGISTRATION_SUCCESS', () => {
		expect(
			reducer([], {
				type: types.IS_REGISTRATION_SUCCESS,
			}),
		).toEqual({
			username: '',
			password: '',
			first_name: '',
			last_name: '',
			cpassword: '',
			email: '',
			errors: {},
			loading: false,
			redirect: true,
		});
	});
	it('should handle IS_REGISTRATION_FAILURE', () => {
		expect(
			reducer([], {
				type: types.IS_REGISTRATION_FAILURE,
				errors: ['errors'],
			}),
		).toEqual({
			loading: false,
			redirect: false,
			errors: ['errors'],
		});
	});
});
