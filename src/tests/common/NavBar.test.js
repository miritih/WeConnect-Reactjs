import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../../Components/common/NavBar';


function setup() {
	const props = {
		location: {
			pathname: '/',
		},
		handleLogout: jest.fn(),
		history: {
			goBack: jest.fn(),
			goForward: jest.fn(),
			replace: jest.fn(),
		},
		loggedIn: false,
		user: {
			username: 'eric',
			image: 'eric',
		},
		actions: {
			isLoggedIn: jest.fn(),
		},
	};

	const enzymeWrapper = mount(<Router><NavBar {...props} /></Router>);
	return {
		props,
		enzymeWrapper,
	};
}
describe('Review items component', () => {
	it('should render component', () => {
		const { enzymeWrapper } = setup();
		expect(enzymeWrapper.find('nav').hasClass('bg-transparent')).toBe(true);
	});
});
