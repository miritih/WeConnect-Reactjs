import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import * as actions from '../../actions/businessProfileAction';
import * as types from '../../actions/actiontypes';

const mockStore = configureMockStore([thunk]);
describe(' Business Profile Actions', () => {
	describe('Test actions creators', () => {
		it('should create an action to check input change', () => {
			const payload = { prop: 'name', value: 'test' };
			const expectedAction = {
				type: types.REVIEW_INPUT_CHANGE,
				payload,
			};
			expect(actions.inputChange(payload)).toEqual(expectedAction);
		});

		it('test viewUserBusinessSuccess action creator ', () => {
			const businesses = { name: 'true', location: 'nairobi' };
			const expectedAction = {
				type: types.VIEW_BUSINESSES_PROFILE_SUCCESS,
				business: businesses,
			};
			expect(actions.viewUserBusinessSuccess(businesses)).toEqual(expectedAction);
		});

		it('test viewBusinessError action creator ', () => {
			const business = { name: 'true', location: 'nairobi' };
			const expectedAction = {
				type: types.LOAD_BUSINESS_PROFILE_ERROR,
				error: business,
			};
			expect(actions.viewBusinessError(business)).toEqual(expectedAction);
		});

		it('test loadBusinessReviewsSuccess action creator ', () => {
			const reviews = { name: 'true', location: 'nairobi' };
			const expectedAction = {
				type: types.LOAD_BUSINESSES_REVIEWS_SUCCESS,
				reviews,
			};
			expect(actions.loadBusinessReviewsSuccess(reviews)).toEqual(expectedAction);
		});
	});

	describe('Test action', () => {
		it('Should dispatch loadBusinessReviews action ', () => {
			const business = {
				id: 1,
			};
			const store = mockStore(business);
			store.dispatch(actions.loadBusinessReviews(business));
			expect(store.getState()).toEqual(business);
		});

		it('Should dispatch viewUserBusiness action ', () => {
			const get = { id: 1 };
			const store = mockStore(get);
			store.dispatch(actions.viewUserBusiness(get));
			expect(store.getState()).toEqual(get);
		});
		it('Should dispatch addReview action ', () => {
			const get = { review: 'review', title: 'title', id: 1 };
			const store = mockStore(get);
			store.dispatch(actions.addReview(get));
			expect(store.getState()).toEqual(get);
		});
	});
});
