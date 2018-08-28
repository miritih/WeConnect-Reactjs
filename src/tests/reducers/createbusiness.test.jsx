import expect from 'expect';
import reducer from '../../reducers/createBusinessReducer';
import * as types from '../../actions/actiontypes';

describe('Create business reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			name: '',
			id: '',
			location: '',
			category: '',
			description: '',
			uploading: false,
			logo: '',
			errors: {},
			edit: false,
			loading: false,
		});
	});
	it('should handle BUSINESS_INPUT_CHANGE', () => {
		expect(
			reducer([], {
				type: types.BUSINESS_INPUT_CHANGE,
				payload: { prop: 'name', value: 'Andela' },
			}),
		).toEqual({ loading: false, name: 'Andela' });
	});

	it('should handle REGISTER_BUSINESS', () => {
		expect(
			reducer([], {
				type: types.REGISTER_BUSINESS,
			}),
		).toEqual({ loading: true });
	});

	it('should handle BUSINESS_REGISTRATION_SUCCESS', () => {
		expect(
			reducer([], {
				type: types.BUSINESS_REGISTRATION_SUCCESS,
			}),
		).toEqual({
			name: '',
			id: '',
			location: '',
			category: '',
			description: '',
			uploading: false,
			logo: '',
			errors: {},
			edit: false,
			loading: false,
		});
	});

	it('should handle BUSINESS_REGISTRATION_FAILURE', () => {
		expect(
			reducer([], {
				type: types.BUSINESS_REGISTRATION_FAILURE,
				errors: ['eric'],
			}),
		).toEqual({
			loading: false,
			errors: ['eric'],
		});
	});

	it('should handle FETCH_BUSINESS_SUCCESS', () => {
		expect(
			reducer([], {
				type: types.FETCH_BUSINESS_SUCCESS,
				business: {
					name: 'Andela',
					location: 'nairobi',
					category: 'tech',
					description: 'tech',
					logo: 'klsdlk',
					id: 1,
				},
			}),
		).toEqual({
			loading: false,
			name: 'Andela',
			location: 'nairobi',
			category: 'tech',
			description: 'tech',
			logo: 'klsdlk',
			id: 1,
		});
	});

	it('should handle ON_MODAL_CLOSE', () => {
		expect(
			reducer([], {
				type: types.ON_MODAL_CLOSE,
			}),
		).toEqual({
			name: '',
			id: '',
			location: '',
			category: '',
			description: '',
			uploading: false,
			logo: '',
			errors: {},
			edit: false,
			loading: false,
		});
	});
});
