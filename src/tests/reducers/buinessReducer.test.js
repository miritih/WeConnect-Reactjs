import expect from 'expect';
import reducer from '../../reducers/businessReducers';
import * as types from '../../actions/actiontypes';

describe('Create business reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			businesses: {},
			page: 0,
			per_page: 0,
			total_pages: 0,
			total_results: 0,
			loading: false,
		});
	});
	it('should handle LOAD_BUSINESSES_SUCCESS', () => {
		expect(
			reducer([], {
				type: types.LOAD_BUSINESSES_SUCCESS,
				businesses: {
					businesses: 'all',
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
	it('should handle LOAD_BUSINESS', () => {
		expect(
			reducer([], {
				type: types.LOAD_BUSINESS,
			}),
		).toEqual({
			loading: true,
		});
	});
});
