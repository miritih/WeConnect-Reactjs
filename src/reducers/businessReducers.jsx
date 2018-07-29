import {
	LOAD_BUSINESSES_SUCCESS,
	LOAD_BUSINESS
} from '../actions/actiontypes';

const initial_state = {
	businesses: {},
	page: '',
	per_page: '',
	total_pages: '',
	total_results: '',
	loading:false
};

export default function BusinessReducer(state = initial_state, action) {
	switch (action.type) {
	case LOAD_BUSINESSES_SUCCESS:
		return {
			...state,
			loading:false,
			businesses: action.businesses.businesses,
			page: action.businesses.page,
			per_page: action.businesses.per_page,
			total_pages: action.businesses.total_pages,
			total_results: action.businesses.total_results
		};
	case LOAD_BUSINESS:
		return{
			...state,
			loading: true
		};
	default:
		return state;
	}
}
