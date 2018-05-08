import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { loadCurrentUser } from './actions/UserAction';
import { isLoggedIn } from './actions/loginActions';

const store = configureStore();
store.dispatch(loadCurrentUser());
store.dispatch(isLoggedIn());

ReactDOM.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
