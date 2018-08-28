import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { BrowserRouter as Router } from 'react-router-dom';

import { Profile } from '../../Components/containerComponents/ProfilePage';


function setup() {
	const props = {
		currentUser: {
			username: 'test',
			password: 'test',
			first_name: 'test',
			last_name: 'test',
			image: 'skd',
			email: 'false',
			uploading: false,
			loading: false,
		},
		userLogin: {
			isLoggedIn: false,
		},
		handleChange: jest.fn(),
		handleSubmit: jest.fn(),
		loginAction: {
			isLoggedIn: jest.fn(),
			updateUser: jest.fn(),
		},
		actions: {
			inputChange: jest.fn(),
		},
		location: {
			pathname: '/',
		},
		history: {
			location: {
				pathname: '/',
			},
			goBack: jest.fn(),
			goForward: jest.fn(),
			replace: jest.fn(),
		},
	};

	const enzymeWrapper = mount(<Router><Profile {...props} /></Router>);
	return {
		props,
		enzymeWrapper,
	};
}
describe('Login component', () => {
	it('should render component', () => {
		const { enzymeWrapper } = setup();
		expect(enzymeWrapper.find('h5').props().children).toBe('Edit Profile');
	});

	it('should handle handleChange', () => {
		const { enzymeWrapper, props } = setup();
		const input = enzymeWrapper.find('input').first();
		const event = { target: { name: 'pollName', value: 'spam' } };
		input.props().onChange(event);
		expect(props.handleChange.mock.calls.length).toBe(0);
	});
});
