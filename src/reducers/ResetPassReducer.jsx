//indent = 0
import * as types from '../actions/actiontypes';
export default function ResetPassReducer(state = [], action) {
	switch (action.type) {
		case types.IS_PASSWORD_RESET_SUCESS:
			return [...state,
			Object.assign({}, action.password)
			];
		case types.IS_PASSWORD_RESET_ERROR:
			return [...state,
			Object.assign({}, action.error)
			];
		default:
			return state;
	}
}