//
import {
	IS_PASSWORD_RESET_SUCCESS,
	IS_PASSWORD_RESET_ERROR,
	RESET_PASS_INPUT_CHANGE,
	RESET_PASSWORD,
} from '../actions/actiontypes';

const initial_state = {
	old_password: '',
	new_password: '',
	confirm_password: '',
	loading: false,
	redirect: false,
	errors: [],
};

export default function ResetPassReducer(state = initial_state, action) {
	switch (action.type) {
	case RESET_PASS_INPUT_CHANGE:
		return {
			...state,
			[action.payload.prop]: action.payload.value,
		};
	case RESET_PASSWORD:
		return {
			...state,
			loading: true,
		};
	case IS_PASSWORD_RESET_SUCCESS:
		return {
			...state,
			...initial_state,
			redirect: true,
		};
	case IS_PASSWORD_RESET_ERROR:
		return {
			...state,
			loading: false,
			redirect: false,
			errors: action.error,
		};
	default:
		return state;
	}
}
