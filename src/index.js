import React from 'react'; //no-unused-var
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { loadCurrentUser } from './actions/UserAction';
import { isLoggedIn } from './actions/loginActions';
import {loadBusinesses} from './actions/businessActions';
import {loadUserBusinesses} from './actions/userBusinessAction';
const store = configureStore();
store.dispatch(loadCurrentUser());
store.dispatch(isLoggedIn());
store.dispatch(loadBusinesses());
store.dispatch(loadUserBusinesses());

ReactDOM.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
