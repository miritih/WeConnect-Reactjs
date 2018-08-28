import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { BrowserRouter as Router } from 'react-router-dom';

import { ResetPass } from '../../Components/containerComponents/ChangePassPage';


function setup() {
	const props = {
		userLogin: {
			isLoggedIn: false,
		},
		passwordReset: {
			old_password: 'test',
			new_password: 'test',
			confirm_password: 'test',
		},
		handleChange: jest.fn(),
		handleSubmit: jest.fn(),
		resetPassActions: {
			inputChange: jest.fn(),
			updatePassword: jest.fn(),
		},
		actions: {
			isLoggedIn: jest.fn(),
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

	const enzymeWrapper = mount(<Router><ResetPass {...props} /></Router>);
	return {
		props,
		enzymeWrapper,
	};
}
describe('Change password component', () => {
	it('should render component', () => {
		const { enzymeWrapper } = setup();
		expect(enzymeWrapper.find('h5').props().children).toBe('Reset Password');
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
