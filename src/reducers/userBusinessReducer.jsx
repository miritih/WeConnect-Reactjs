import {
	LOAD_USER_BUSINESS,
	LOAD_USER_BUSINESSES_SUCCESS,
	DELETE_USER_BUSINESSES_SUCCESS,

} from '../actions/actiontypes';

const initial_state = {
	businesses: {},
	business:{},
	page: '',
	per_page: '',
	total_pages: '',
	total_results: '',
	loading:false
};

export default function UserBusinessReducer(state = initial_state, action) {
	switch (action.type) {
	case LOAD_USER_BUSINESS:
		return{
			...state,
			loading: true
		};
	case LOAD_USER_BUSINESSES_SUCCESS:
		return{
			...state,
			loading:false,
			businesses: action.businesses.Results,
			page: action.businesses.page,
			per_page: action.businesses.per_page,
			total_pages: action.businesses.total_pages,
			total_results: action.businesses.total_results,
		};
	case DELETE_USER_BUSINESSES_SUCCESS:
		return{
			...state,
			loading: false
		};
	default:
		return state;
	}
}
