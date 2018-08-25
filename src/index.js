import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { loadCurrentUser } from './actions/UserAction';
import { isLoggedIn } from './actions/loginActions';
import { loadBusinesses } from './actions/businessActions';
// when the application start load the inital data to the store
// To do that we dispatch the actions we want
const store = configureStore();
store.dispatch(loadCurrentUser());
store.dispatch(isLoggedIn());
store.dispatch(loadBusinesses());

ReactDOM.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('root'),
);
registerServiceWorker();
