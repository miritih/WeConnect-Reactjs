import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import * as actions from '../../actions/registerUserAction';
import * as types from '../../actions/actiontypes';

const mockStore = configureMockStore([thunk]);
describe('Register user Actions', () => {
	describe('Test actions creators', () => {
		it('should create an action to check input change', () => {
			const payload = { prop: 'username', value: 'test' };
			const expectedAction = {
				type: types.INPUT_CHANGE,
				payload,
			};
			expect(actions.inputChange(payload)).toEqual(expectedAction);
		});

		it('test registrationSuccess action creator ', () => {
			const response = true;
			const expectedAction = {
				type: types.IS_REGISTRATION_SUCCESS,
				response,
			};
			expect(actions.registrationSuccess(response)).toEqual(expectedAction);
		});

		it('test registrationFailure action creator', () => {
			const errors = { error: 'eeee' };
			const expectedAction = {
				type: types.IS_REGISTRATION_FAILURE,
				errors,
			};
			expect(actions.registrationFailure(errors)).toEqual(expectedAction);
		});
	});

	describe('Test action', () => {
		it('Should dispatch registerUser action ', () => {
			const user = {
				username: 'miriti',
				email: 'email',
				first_name: 'firstname',
				last_name: 'password',
				password: 'qwerty123',
			};
			const returnedAction = [{
				type: types.REGISTER_USER,
			}];
			const store = mockStore({});
			store.dispatch(actions.registerUser(user));
			expect(store.getActions()).toEqual(returnedAction);
		});
	});
});
