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
	error:'',
	loading: false,
};
export default function NewBusinessReducer(state = INITIAL_STATE,  action) {
	switch (action.type) {
	case LOAD_BUSINESS_PROFILE:
		return {
			...state,
			loading: true,
		};
	case VIEW_BUSINESSES_PROFILE_SUCCESS:
		return {
			...state,
			name: action.business.name,
			location: action.business.location,
			category: action.business.category,
			description: action.business.description,
			logo: action.business.logo
		};
	case LOAD_BUSINESSES_REVIEWS_SUCCESS:
		return {
			...state,
			loading: false,
			reviews: action.reviews
		};
	case LOAD_BUSINESS_PROFILE_ERROR:
		return{
			...state,
			loading: false,
			error: action.error
		};
	default:
		return state;
	}
}