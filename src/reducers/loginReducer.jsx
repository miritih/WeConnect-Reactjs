import * as types from '../actions/actiontypes';
export default function LoginReducer(state = [], action) {
	switch (action.type) {
		case types.IS_LOGGED_IN_SUCCESS:
			return action.isLoggedIn;
		case types.SET_LOGGED_IN_SUCCESS:
			return action.isLoggedIn;
		default:
			return state;
	}
}