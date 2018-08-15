import React from 'react';
import { mount } from 'enzyme';
import ResetPassForm from '../../Components/forms/ResetPasswordForm';
import expect from 'expect';


function setup() {
	const props = {
		handleChange: jest.fn(), 
		handleSubmit: jest.fn(), 
		email: 'email',
		errors: 'eroor',
		
	};

	const enzymeWrapper = mount(<ResetPassForm {...props} />);
	return {
		props,
		enzymeWrapper
	};
}
describe('Profile Update  component', () => {
	it('should render component', () => {
		const { enzymeWrapper } = setup();
		expect(enzymeWrapper.find('Button').hasClass('btn-signin')).toBe(true);
		expect(enzymeWrapper.find('input').hasClass('form-control')).toBe(true);
		expect(enzymeWrapper.find('label').text()).toBe('Email used to register');
		expect(enzymeWrapper.find('form').hasClass('form')).toBe(true);
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