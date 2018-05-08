//indent = 0
import * as types from '../actions/actiontypes';
export default function UserReducer(state = [], action) {
	switch (action.type) {
		case types.REGISTER_USER:
			return [...state,
			Object.assign({}, action.user)
			];
		case types.LOAD_USER_SUCCESS:
			return action.user;
		default:
			return state;
	}
}