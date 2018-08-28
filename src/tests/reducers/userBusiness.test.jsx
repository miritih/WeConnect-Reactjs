import expect from 'expect';
import reducer from '../../reducers/userBusinessReducer';
import * as types from '../../actions/actiontypes';

describe('User Business reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			businesses: {},
			business: {},
			page: 0,
			per_page: 0,
			total_pages: 0,
			total_results: '',
			loading: false,
		});
	});
	it('should handle LOAD_USER_BUSINESSES_SUCCESS', () => {
		expect(
			reducer([], {
				type: types.LOAD_USER_BUSINESSES_SUCCESS,
				businesses: {
					Results: 'all',
					page: 1,
					per_page: 34,
					total_pages: 45,
					total_results: 2839,
				},
			}),
		).toEqual({
			loading: false,
			businesses: 'all',
			page: 1,
			per_page: 34,
			total_pages: 45,
			total_results: 2839,
		});
	});
	it('should handle LOAD_USER_BUSINESS', () => {
		expect(
			reducer([], {
				type: types.LOAD_USER_BUSINESS,
			}),
		).toEqual({
			loading: true,
		});
	});

	it('should handle DELETE_USER_BUSINESSES_SUCCESS', () => {
		expect(
			reducer([], {
				type: types.DELETE_USER_BUSINESSES_SUCCESS,
			}),
		).toEqual({
			loading: false,
		});
	});
});
