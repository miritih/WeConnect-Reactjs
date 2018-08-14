import { 
	BUSINESS_REGISTRATION_SUCCESS, 
	BUSINESS_INPUT_CHANGE, 
	BUSINESS_REGISTRATION_FAILURE,
	REGISTER_BUSINESS
} from '../actions/actiontypes';
const INITIAL_STATE = {
	name: '',
	location: '',
	category: '',
	description: '',
	uploading : false,
	logo:'',
	errors: {},
	loading: false,
};
export default function NewBusinessReducer(state = INITIAL_STATE,  action) {
	switch (action.type) {
	case BUSINESS_INPUT_CHANGE:
		return {
			...state,
			loading: false,
			[action.payload.prop]: action.payload.value };
	case REGISTER_BUSINESS:
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