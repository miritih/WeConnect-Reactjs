import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import * as actions from '../../actions/UserAction';
import * as types from '../../actions/actiontypes';

const mockStore = configureMockStore([thunk]);

describe('User Actions',()=>{
	beforeEach(() => moxios.install());
	afterEach(() => moxios.uninstall());
	describe('Test actions types', () => {
		it('should create an action to check input change', () => {
			const payload = {prop: 'username', value : 'test'};
			const expectedAction = {
				type: types.PROFILE_INPUT_CHANGE,
				payload
			};
			expect(actions.inputChange(payload)).toEqual(expectedAction);
		});

		it('should loader current logged in user', () => {
			const user = {prop: 'username', value : 'test'};
			const expectedAction = {
				type: types.LOAD_USER_SUCCESS,
				user
			};
			expect(actions.loadUserSuccess(user)).toEqual(expectedAction);
		});

		it('should update user', () => {
			const user = {prop: 'username', value : 'test'};
			const expectedAction = {
				type: types.UPDATE_CURRENT_USER,
				user
			};
			expect(actions.updateUserSuccess(user)).toEqual(expectedAction);
		});

		it('should update user profile', () => {
			const payload = {prop: 'username', value : 'test'};
			const expectedAction = {
				type: types.UPDATE_PROFILE_SUCCESS,
				payload
			};
			expect(actions.updateProfileSuccess(payload)).toEqual(expectedAction);
		});
	});

	describe('loadCurrentUser action', () => {
		it('Should dispatch UPDATE_CURRENT_USER action ', () => {
			const user = {
				email: 'test',
				username: 'test',
				image: 'image',
				first_name: 'first_name',
				last_name: 'last_name'
			};
			const returnedAction = [{
				type: types.UPDATE_CURRENT_USER,
				user
			}]; 
			const store = mockStore({});
			store.dispatch(actions.updateUserProfile(user));
			expect(store.getActions()).toEqual(returnedAction);
		});
		it('Should dispatch updateUser action ', () => {
			const user = {
				email: 'test',
				image: 'image',
				first_name: 'first_name',
				last_name: 'last_name'
			};
			const returnedAction = [{
				type: types.UPDATE_PROFILE,
			}]; 
			const store = mockStore({});
			store.dispatch(actions.updateUser(user));
			expect(store.getActions()).toEqual(returnedAction);
		});
	});
});
