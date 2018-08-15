import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import * as actions from '../../actions/loginActions';
import * as types from '../../actions/actiontypes';

const mockStore = configureMockStore([thunk]);
describe('Login Actions',()=>{
	describe('Test actions creators', () => {
		it('should create an action to check input change', () => {
			const payload = {prop: 'username', value : 'test'};
			const expectedAction = {
				type: types.LOGIN_INPUT_CHANGE,
				payload
			};
			expect(actions.inputChange(payload)).toEqual(expectedAction);
		});

		it('test isLoggedInSuccess action creator ', () => {
			const isLoggedIn = true;
			const expectedAction = {
				type: types.IS_LOGGED_IN_SUCCESS,
				isLoggedIn
			};
			expect(actions.isLoggedInSuccess(isLoggedIn)).toEqual(expectedAction);
		});

		it('test setLoggedInSuccess action creator', () => {
			const isLoggedIn = true;
			const expectedAction = {
				type: types.SET_LOGGED_IN_SUCCESS,
				isLoggedIn
			};
			expect(actions.setLoggedInSuccess(isLoggedIn)).toEqual(expectedAction);
		});
	});

	describe('Test action', () => {
		it('Should dispatch isLoggedIn action ', () => {
			const isLoggedIn = false;
			const returnedAction = [{
				type: types.IS_LOGGED_IN_SUCCESS,
				isLoggedIn
			}]; 
			const store = mockStore({});
			store.dispatch(actions.isLoggedIn());
			expect(store.getActions()).toEqual(returnedAction);
		});

		it('Should dispatch loginUser action ', () => {
			const user = {username: 'miriti', password: 'qwerty123'};
			const returnedAction = [{
				type: types.LOGIN_USER
			}]; 
			const store = mockStore({});
			store.dispatch(actions.loginUser(user));
			expect(store.getActions()).toEqual(returnedAction);
		});
	});

});