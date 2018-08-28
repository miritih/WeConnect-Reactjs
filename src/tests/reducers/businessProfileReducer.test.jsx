import expect from 'expect';
import reducer from '../../reducers/businessProfileReducer';
import * as types from '../../actions/actiontypes';

describe('Business Profile reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			name: '',
			id: '',
			location: '',
			category: '',
			description: '',
			reviews: {},
			logo: '',
			error: [],
			title: '',
			review: '',
			loading: false,
		});
	});
	it('should handle VIEW_BUSINESSES_PROFILE_SUCCESS', () => {
		expect(
			reducer([], {
				type: types.VIEW_BUSINESSES_PROFILE_SUCCESS,
				business: {
					name: 'name',
					location: 'location',
					category: 'category',
					description: 'description',
					logo: 'logo',
					id: 'id',
				},
			}),
		).toEqual({
			name: 'name',
			location: 'location',
			category: 'category',
			description: 'description',
			logo: 'logo',
			id: 'id',
		});
	});
	it('should handle LOAD_BUSINESS_PROFILE', () => {
		expect(
			reducer([], {
				type: types.LOAD_BUSINESS_PROFILE,
			}),
		).toEqual({
			loading: true,
		});
	});

	it('should handle LOAD_BUSINESSES_REVIEWS_SUCCESS', () => {
		expect(
			reducer([], {
				type: types.LOAD_BUSINESSES_REVIEWS_SUCCESS,
				reviews: ['test', 'test2'],
			}),
		).toEqual({
			loading: false,
			reviews: ['test', 'test2'],
		});
	});
	it('should handle LOAD_BUSINESS_PROFILE_ERROR', () => {
		expect(
			reducer([], {
				type: types.LOAD_BUSINESS_PROFILE_ERROR,
				error: ['test'],
			}),
		).toEqual({
			loading: false,
			error: ['test'],
		});
	});
	it('should handle REVIEW_INPUT_CHANGE', () => {
		expect(
			reducer([], {
				type: types.REVIEW_INPUT_CHANGE,
				payload: { prop: 'review', value: 'egweg2378' },
			}),
		).toEqual({
			review: 'egweg2378',
		});
	});
});
