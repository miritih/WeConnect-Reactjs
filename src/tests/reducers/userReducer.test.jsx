import expect from 'expect';
import reducer from '../../reducers/UserReducer';
import * as types from '../../actions/actiontypes';

describe('User reducer', () => {
	const user = {
		email: 'test email',
		first_name: 'test',
		username: 'test',
		last_name: 'test',
		image: 'test',
	};
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			email: '',
			first_name: '',
			username: '',
			change: false,
			last_name: '',
			loading: false,
			uploading: false,
			image: '',
		});
	});

	it('should handle LOAD_USER_SUCCESS', () => {
		expect(
			reducer([], {
				type: types.LOAD_USER_SUCCESS,
				user,
			}),
		).toEqual(
			{
				email: 'test email',
				first_name: 'test',
				username: 'test',
				last_name: 'test',
				image: 'test',
			},
		);
	});
	it('should handle UPDATE_CURRENT_USER', () => {
		expect(
			reducer([], {
				type: types.UPDATE_CURRENT_USER,
				user,
			}),
		).toEqual(
			{
				email: 'test email',
				change: false,
				first_name: 'test',
				username: 'test',
				last_name: 'test',
				image: 'test',
			},
		);
	});

	it('should handle PROFILE_INPUT_CHANGE', () => {
		expect(
			reducer([], {
				type: types.PROFILE_INPUT_CHANGE,
				payload: { prop: 'eric', value: 'mwenda' },
			}),
		).toEqual(
			{
				loading: false,
				change: true,
				eric: 'mwenda',
			},
		);
	});
	it('should handle UPDATE_PROFILE', () => {
		expect(
			reducer([], {
				type: types.UPDATE_PROFILE,
			}),
		).toEqual(
			{
				loading: true,
			},
		);
	});
	it('should handle UPDATE_PROFILE_SUCCESS', () => {
		expect(
			reducer([], {
				type: types.UPDATE_PROFILE_SUCCESS,
			}),
		).toEqual(
			{
				loading: false,
			},
		);
	});
});
