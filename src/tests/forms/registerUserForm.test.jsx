import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterForm from '../../Components/forms/RegisterForm';


function setup() {
	const props = {
		confirmPass: jest.fn(),
		handleChange: jest.fn(),
		handleSubmit: jest.fn(),
		cpassword: 'new',
		password: 'old',
		username: 'username',
		email: 'email',
		first_name: 'name',
		last_name: 'name',
		errors: ['eroor'],
		loading: false,
	};

	const enzymeWrapper = mount(<Router><RegisterForm {...props} /></Router>);
	return {
		props,
		enzymeWrapper,
	};
}
describe('Register user component', () => {
	it('should render component', () => {
		const { enzymeWrapper } = setup();
		expect(enzymeWrapper.find('Button').hasClass('btn-signin')).toBe(true);
		expect(enzymeWrapper.find('input').first().hasClass('form-control')).toBe(true);
		expect(enzymeWrapper.find('label').first().text()).toBe('Username');
		expect(enzymeWrapper.find('form').hasClass('form')).toBe(true);
		expect(enzymeWrapper.find('form').childAt(6).props().text).toBe('Register ');
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
