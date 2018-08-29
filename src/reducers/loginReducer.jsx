import {
	LOGIN_INPUT_CHANGE,
	IS_LOGGED_IN_FAILURE,
	LOGIN_USER,
	IS_LOGGED_IN_SUCCESS,
} from '../actions/actiontypes';

const INITIAL_STATE = {
	password: '',
	username: '',
	loading: false,
	redirect: false,
	isLoggedIn: false,
};
export default function LoginReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case LOGIN_USER:
		return {
			...state,
			loading: true,
		};
	case LOGIN_INPUT_CHANGE:
		return {
			...state,
			[action.payload.prop]: action.payload.value,
		};
	case IS_LOGGED_IN_SUCCESS:
		return {
			...state,
			loading: false,
			redirect: action.isLoggedIn,
			isLoggedIn: action.isLoggedIn,
		};
	case IS_LOGGED_IN_FAILURE:
		return {
			...state,
			...INITIAL_STATE,
			loading: false,
			isLoggedIn: false,
		};
	default:
		return state;
	}
}
