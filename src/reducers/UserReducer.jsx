import {
	UPDATE_CURRENT_USER, LOAD_USER_SUCCESS,
	PROFILE_INPUT_CHANGE, UPDATE_PROFILE,
	UPDATE_PROFILE_SUCCESS,
} from '../actions/actiontypes';

const initial_state = {
	email: '',
	first_name: '',
	username: '',
	change: false,
	last_name: '',
	loading: false,
	uploading: false,
	image: '',
};

export default function UserReducer(state = initial_state, action) {
	switch (action.type) {
	case LOAD_USER_SUCCESS:
		return {
			...state,
			email: action.user.email,
			first_name: action.user.first_name,
			last_name: action.user.last_name,
			image: action.user.image,
			username: action.user.username,
		};

	case UPDATE_CURRENT_USER:
		return {
			...state,
			change: false,
			email: action.user.email,
			first_name: action.user.first_name,
			last_name: action.user.last_name,
			image: action.user.image,
			username: action.user.username,
		};
	case PROFILE_INPUT_CHANGE:
		return {
			...state,
			loading: false,
			change: true,
			[action.payload.prop]: action.payload.value,
		};
	case UPDATE_PROFILE:
		return {
			...state,
			loading: true,
		};
	case UPDATE_PROFILE_SUCCESS:
		return {
			...state,
			loading: false,
		};
	default:
		return state;
	}
}
