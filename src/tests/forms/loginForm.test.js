import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from '../../Components/forms/LoginForm';


function setup() {
	const props = {
		handleChange: jest.fn(),
		handleSubmit: jest.fn(),
		username: 'test',
		password: 'text',
	};

	const enzymeWrapper = mount(<Router><LoginForm {...props} /></Router>);
	return {
		props,
		enzymeWrapper,
	};
}
describe('LoginForm component', () => {
	it('should render input field', () => {
		const { enzymeWrapper } = setup();

		expect(enzymeWrapper.find('Button').hasClass('btn-signin')).toBe(true);
		expect(enzymeWrapper.find('input').first().hasClass('form-control')).toBe(true);
		expect(enzymeWrapper.find('label').first().text()).toBe('Username');
		expect(enzymeWrapper.find('p').hasClass('message')).toBe(true);
	});

	it('should call handleChange on input change', () => {
		const { enzymeWrapper, props } = setup();
		const input = enzymeWrapper.find('input').first();
		input.props().onChange('yy');
		expect(props.handleChange.mock.calls.length).toBe(1);
	});

	it('should call handleSubmit on form submit', () => {
		const { enzymeWrapper, props } = setup();
		const form = enzymeWrapper.find('form');
		form.props().onSubmit('');
		expect(props.handleSubmit.mock.calls.length).toBe(1);
	});
});
