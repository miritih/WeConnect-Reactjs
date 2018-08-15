import React from 'react';
import { mount } from 'enzyme';
import ResetPassForm from '../../Components/forms/ChangePassForm';
import expect from 'expect';

function setup() {
	const props = {
		handleChange: jest.fn(), 
		handleSubmit: jest.fn(), 
		confirm_password: 'new',
		old_password: 'old',
		new_password: 'new',
		errors:['eroor'],
		loading: false
	};

	const enzymeWrapper = mount(<ResetPassForm {...props} />);
	return {
		props,
		enzymeWrapper
	};
}
describe('change password component', () => {
	it('should render component', () => {
		const { enzymeWrapper } = setup();

		expect(enzymeWrapper.find('Button').hasClass('btn-primary')).toBe(true);
		expect(enzymeWrapper.find('input').first().hasClass('form-control')).toBe(true);
		expect(enzymeWrapper.find('label').first().text()).toBe('Old Password');
		expect(enzymeWrapper.find('form').hasClass('form')).toBe(false);
		expect(enzymeWrapper.find('form').childAt(3).props().text).toBe('Update Password ');
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