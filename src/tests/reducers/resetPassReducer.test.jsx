import expect from 'expect';
import reducer from '../../reducers/ResetPassReducer';
import * as types from '../../actions/actiontypes';

describe('Login reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			old_password: '',
			new_password: '',
			confirm_password: '',
			loading: false,
			redirect: false,
			errors: [],
		});
	});
	it('should handle RESET_PASS_INPUT_CHANGE', () => {
		expect(
			reducer([], {
				type: types.RESET_PASS_INPUT_CHANGE,
				payload: { prop: 'password', value: 'egweg2378' },
			}),
		).toEqual({ password: 'egweg2378' });
	});

	it('should handle IS_PASSWORD_RESET_SUCCESS', () => {
		expect(
			reducer([], {
				type: types.IS_PASSWORD_RESET_SUCCESS,
			}),
		).toEqual({
			old_password: '',
			new_password: '',
			confirm_password: '',
			loading: false,
			redirect: true,
			errors: [],
		});
	});

	it('should handle IS_PASSWORD_RESET_ERROR', () => {
		expect(
			reducer([], {
				type: types.IS_PASSWORD_RESET_ERROR,
				redirect: false,
				error: ['error'],
			}),
		).toEqual({
			loading: false,
			redirect: false,
			errors: ['error'],
		});
	});
});
