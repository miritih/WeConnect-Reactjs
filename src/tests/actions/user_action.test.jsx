import * as actions from '../../actions/UserAction';
import * as types from '../../actions/actiontypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import expect from 'expect';
import axios from 'axios';
import {baseURL} from '../../utils/Config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test UserActions', () => {
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
