import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { BrowserRouter as Router } from 'react-router-dom';

import { LoginPage } from '../../Components/containerComponents/LoginPage';


function setup() {
	const props = {
		userLogin: {
			username: 'test',
			password: 'test',
			loading: false,
			isLoggedIn: false,
		},
		handleChange: jest.fn(),
		handleSubmit: jest.fn(),
		actions: {
			isLoggedIn: jest.fn(),
			inputChange: jest.fn(),
			loginUser: jest.fn(),
		},
		location: {
			pathname: '/',
		},
		history: {
			goBack: jest.fn(),
			goForward: jest.fn(),
			replace: jest.fn(),
		},
	};

	const enzymeWrapper = mount(<Router><LoginPage {...props} /></Router>);
	return {
		props,
		enzymeWrapper,
	};
}
describe('Login component', () => {
	it('should render component', () => {
		const { enzymeWrapper } = setup();
		expect(enzymeWrapper.find('form').hasClass('form')).toBe(true);
	});

	it('should handle handleChange', () => {
		const { enzymeWrapper, props } = setup();
		const input = enzymeWrapper.find('input').first();
		const event = { target: { name: 'pollName', value: 'spam' } };
		input.props().onChange(event);
		expect(props.handleChange.mock.calls.length).toBe(0);
	});

	it('should handle handleSubmit', () => {
		const { enzymeWrapper, props } = setup();
		const input = enzymeWrapper.find('form').first();
		input.props().onSubmit({ preventDefault() {} });
		expect(props.handleSubmit.mock.calls.length).toBe(0);
	});
});
