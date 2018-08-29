import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '../Routes';
import configureStore from '../store/configureStore';


it('renders without crashing', () => {
	const store = configureStore();
	const div = document.createElement('div');
	ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, div);
	ReactDOM.unmountComponentAtNode(div);
});
