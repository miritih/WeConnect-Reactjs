import {
	VIEW_BUSINESSES_PROFILE_SUCCESS,
	LOAD_BUSINESSES_REVIEWS_SUCCESS,
	LOAD_BUSINESS_PROFILE,
	LOAD_BUSINESS_PROFILE_ERROR
} from '../actions/actiontypes';
const INITIAL_STATE = {
	name: '',
	location: '',
	category: '',
	description: '',
	reviews : {},
	logo:'',
	loading: false,
};
export default function NewBusinessReducer(state = INITIAL_STATE,  action) {
	switch (action.type) {
	case LOAD_BUSINESS_PROFILE:
		return {
			...state,
			loading: true,
		};
	case BUSINESS_REGISTRATION_SUCCESS:
		return {
			...state,
			...INITIAL_STATE,
			loading: false
		};
	case BUSINESS_REGISTRATION_FAILURE:
		return {
			...state,
			loading: false,
			errors: action.errors
		};
	default:
		return state;
	}
}