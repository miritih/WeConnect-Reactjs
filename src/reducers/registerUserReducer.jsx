export default function registerUserReducer(state = [], action) {
	switch (action.type) {
		case 'REGISTER_USER':
			return [...state,
			Object.assign({}, action.user)
			];
		default:
			return state;
	}
}