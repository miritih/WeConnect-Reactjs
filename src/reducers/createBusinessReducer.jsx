import {
	BUSINESS_REGISTRATION_SUCCESS,
	BUSINESS_INPUT_CHANGE,
	BUSINESS_REGISTRATION_FAILURE,
	REGISTER_BUSINESS,
	FETCH_BUSINESS_SUCCESS,
	ON_MODAL_CLOSE,
} from '../actions/actiontypes';

const INITIAL_STATE = {
	name: '',
	id: '',
	location: '',
	category: '',
	description: '',
	uploading: false,
	logo: '',
	errors: {},
	edit: false,
	loading: false,
};
export default function NewBusinessReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case BUSINESS_INPUT_CHANGE:
		return {
			...state,
			loading: false,
			[action.payload.prop]: action.payload.value,
		};
	case REGISTER_BUSINESS:
		return {
			...state,
			loading: true,
		};
	case BUSINESS_REGISTRATION_SUCCESS:
		return {
			...state,
			...INITIAL_STATE,
			loading: false,
		};
	case BUSINESS_REGISTRATION_FAILURE:
		return {
			...state,
			loading: false,
			errors: action.errors,
		};
	case FETCH_BUSINESS_SUCCESS:
		return {
			...state,
			loading: false,
			name: action.business.name,
			location: action.business.location,
			category: action.business.category,
			description: action.business.description,
			logo: action.business.logo,
			id: action.business.id,
		};
	case ON_MODAL_CLOSE:
		return {
			...state,
			...INITIAL_STATE,
		};
	default:
		return state;
	}
}
