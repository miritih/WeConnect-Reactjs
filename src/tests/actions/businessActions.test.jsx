import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import * as actions from '../../actions/businessActions';
import * as types from '../../actions/actiontypes';

const mockStore = configureMockStore([thunk]);
describe(' Business Actions', () => {
	describe('Test actions creators', () => {
		it('test loadBusinessesSuccess action creator ', () => {
			const businesses = { name: 'true', location: 'nairobi' };
			const expectedAction = {
				type: types.LOAD_BUSINESSES_SUCCESS,
				businesses,
			};
			expect(actions.loadBusinessesSuccess(businesses)).toEqual(expectedAction);
		});
	});

	describe('Test action', () => {
		it('Should dispatch loadBusinesses action ', () => {
			const business = {
				page: 1, query: '',
			};
			const store = mockStore(business);
			store.dispatch(actions.loadBusinesses(business));
			expect(store.getState()).toEqual(business);
		});
	});
});
