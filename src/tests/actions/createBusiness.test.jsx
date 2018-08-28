import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import * as actions from '../../actions/createBusinessAction';
import * as types from '../../actions/actiontypes';

const mockStore = configureMockStore([thunk]);
describe('Create business Actions', () => {
	describe('Test actions creators', () => {
		it('should create an action to check input change', () => {
			const payload = { prop: 'name', value: 'test' };
			const expectedAction = {
				type: types.BUSINESS_INPUT_CHANGE,
				payload,
			};
			expect(actions.inputChange(payload)).toEqual(expectedAction);
		});

		it('test registrationSuccess action creator ', () => {
			const businesses = { name: 'true', location: 'nairobi' };
			const expectedAction = {
				type: types.BUSINESS_REGISTRATION_SUCCESS,
				response: businesses,
			};
			expect(actions.registrationSuccess(businesses)).toEqual(expectedAction);
		});

		it('test registrationFailure action creator ', () => {
			const business = { name: 'true', location: 'nairobi' };
			const expectedAction = {
				type: types.BUSINESS_REGISTRATION_FAILURE,
				errors: business,
			};
			expect(actions.registrationFailure(business)).toEqual(expectedAction);
		});

		it('test fetchBusinessSuccess action creator ', () => {
			const business = { name: 'true', location: 'nairobi' };
			const expectedAction = {
				type: types.FETCH_BUSINESS_SUCCESS,
				business,
			};
			expect(actions.fetchBusinessSuccess(business)).toEqual(expectedAction);
		});
		it('test onclose action creator ', () => {
			const expectedAction = {
				type: types.ON_MODAL_CLOSE,
			};
			expect(actions.onclose()).toEqual(expectedAction);
		});
	});

	describe('Test action', () => {
		it('Should dispatch registerBusiness action ', () => {
			const business = {
				name: 'name', location: 'loaction', category: 'category', description: 'desc', logo: 'logo', id: 1,
			};
			const store = mockStore(business);
			store.dispatch(actions.registerBusiness(business));
			expect(store.getState()).toEqual(business);
		});

		it('Should dispatch fetchBusiness action ', () => {
			const get = { id: 1 };
			const store = mockStore(get);
			store.dispatch(actions.fetchBusiness(get));
			expect(store.getState()).toEqual(get);
		});
	});
});
