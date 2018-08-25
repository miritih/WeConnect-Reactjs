import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import * as actions from '../../actions/ResetPasswordActions';
import * as types from '../../actions/actiontypes';

const mockStore = configureMockStore([thunk]);
describe('Register user Actions', () => {
	describe('Test actions creators', () => {
		it('should create an action to check input change', () => {
			const payload = { prop: 'username', value: 'test' };
			const expectedAction = {
				type: types.RESET_PASS_INPUT_CHANGE,
				payload,
			};
			expect(actions.inputChange(payload)).toEqual(expectedAction);
		});

		it('test resetPasswordSuccess action creator ', () => {
			const password = true;
			const expectedAction = {
				type: types.IS_PASSWORD_RESET_SUCCESS,
				password,
			};
			expect(actions.resetPasswordSuccess(password)).toEqual(expectedAction);
		});

		it('test resetPasswordError action creator', () => {
			const error = { error: 'eeee' };
			const expectedAction = {
				type: types.IS_PASSWORD_RESET_ERROR,
				error,
			};
			expect(actions.resetPasswordError(error)).toEqual(expectedAction);
		});
	});

	describe('Test action', () => {
		it('Should dispatch updatePassword action ', () => {
			const user = { old_password: 'miriti', password: 'test' };
			const store = mockStore(user);
			store.dispatch(actions.updatePassword(user));
			expect(store.getState()).toEqual(user);
		});
	});

	it('Should dispatch resetPassword action ', () => {
		const user = { old_password: 'miriti', password: 'test' };
		const store = mockStore(user);
		store.dispatch(actions.resetPassword(user));
		expect(store.getState()).toEqual(user);
	});
});
