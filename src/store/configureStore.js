import { createStore, applyMiddleware, compose } from 'redux';
import rootreducer from '../reducers';
export default function configureStore(initialstate) {
	return createStore(
		rootreducer,
		initialstate,
		compose(
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	);
}
