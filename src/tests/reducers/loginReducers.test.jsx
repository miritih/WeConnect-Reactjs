import reducer from '../../reducers/loginReducer';
import * as types from '../../actions/actiontypes';
import expect from 'expect';

describe('Login reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			password:'',
			username:'',
			loading: false,
			redirect:false,
			isLoggedIn: false
		});
	});
	it('should handle LOGIN_USER', () => {
		expect(
			reducer([], {
				type: types.LOGIN_USER,
			})
		).toEqual({loading: true});
	});
	it('should handle LOGIN_INPUT_CHANGE', () => {
		expect(
			reducer([], {
				type: types.LOGIN_INPUT_CHANGE,
				payload: {prop: 'username', value:'username'}
			})
		).toEqual({username: 'username'});
	});

	it('should handle IS_LOGGED_IN_SUCCESS', () => {
		expect(
			reducer([], {
				type: types.IS_LOGGED_IN_SUCCESS,
				isLoggedIn: true
			})
		).toEqual({
			loading: false,
			redirect: true,
			isLoggedIn: true
		});
	});

	it('should handle IS_LOGGED_IN_FAILURE', () => {
		expect(
			reducer([], {
				type: types.IS_LOGGED_IN_FAILURE,
			})
		).toEqual({
			password:'',
			username:'',
			loading: false,
			redirect:false,
			isLoggedIn: false
		});
	});

});