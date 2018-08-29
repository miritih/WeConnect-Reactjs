import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootreducer from '../reducers';

export default function configureStore(initialstate) {
	return createStore(
		rootreducer,
		initialstate,
		compose(
			applyMiddleware(thunk), // apply thunk middleware
			window.devToolsExtension ? window.devToolsExtension() : f => f,
		),
	);
}
