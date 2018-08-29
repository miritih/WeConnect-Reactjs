import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import * as actions from '../../actions/userBusinessAction';
import * as types from '../../actions/actiontypes';

const mockStore = configureMockStore([thunk]);
describe('User business Actions', () => {
	describe('Test actions creators', () => {
		it('test loadUserBusinessesSuccess action creator ', () => {
			const businesses = { name: 'true', location: 'nairobi' };
			const expectedAction = {
				type: types.LOAD_USER_BUSINESSES_SUCCESS,
				businesses,
			};
			expect(actions.loadUserBusinessesSuccess(businesses)).toEqual(expectedAction);
		});

		it('test deleteUserBusinessesSuccess action creator ', () => {
			const business = { name: 'true', location: 'nairobi' };
			const expectedAction = {
				type: types.DELETE_USER_BUSINESSES_SUCCESS,
				business,
			};
			expect(actions.deleteUserBusinessesSuccess(business)).toEqual(expectedAction);
		});
	});

	describe('Test action', () => {
		it('Should dispatch loadUserBusinesses action ', () => {
			const get = { page: 1, query: 'test' };
			const store = mockStore(get);
			store.dispatch(actions.loadUserBusinesses(get));
			expect(store.getState()).toEqual(get);
		});
		it('Should dispatch deleteUserBusinesses action ', () => {
			const get = { id: 1 };
			const store = mockStore(get);
			store.dispatch(actions.deleteUserBusinesses(get));
			expect(store.getState()).toEqual(get);
		});
	});
});
