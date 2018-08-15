import {REGISTER_USER, INPUT_CHANGE, IS_REGISTRATION_SUCCESS, IS_REGISTRATION_FAILURE} from '../actions/actiontypes';
const INITIAL_STATE = {
	username: '',
	password: '',
	first_name: '',
	last_name: '',
	cpassword:'',
	email: '',
	errors: {},
	loading: false,
	redirect: false
};
export default function UserReducer(state = INITIAL_STATE,  action) {
	switch (action.type) {
	case INPUT_CHANGE:
		return {
			...state,
			loading: false,
			[action.payload.prop]: action.payload.value };
	case REGISTER_USER:
		return {
			...state,
			redirect: false,
			loading: true,
		};
	case IS_REGISTRATION_SUCCESS:
		return {
			...state,
			...INITIAL_STATE,
			redirect: true,
			loading: false
		};
	case IS_REGISTRATION_FAILURE:
		return {
			...state,
			loading: false,
			redirect: false,
			errors: action.errors
		};
	default:
		return state;
	}
}