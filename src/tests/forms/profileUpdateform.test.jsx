import React from 'react';
import { mount } from 'enzyme';
import ProfileUpdate from '../../Components/forms/ProfileUpdate';
import expect from 'expect';
import { BrowserRouter as Router } from 'react-router-dom';


function setup() {
	const props = {
		handleChange: jest.fn(), 
		handleSubmit: jest.fn(), 
		username: 'username',
		email: 'email',
		first_name: 'name',
		last_name: 'name',
		errors:['eroor'],
		loading: false,
		uploading: false,
		handleDrop: jest.fn(),
		change: false,
		image: 'fgfg',
	};

	const enzymeWrapper = mount(<Router><ProfileUpdate {...props} /></Router>);
	return {
		props,
		enzymeWrapper
	};
}
describe('Profile Update  component', () => {
	it('should render component', () => {
		const { enzymeWrapper } = setup();
		expect(enzymeWrapper.find('Button').hasClass('btn-primary')).toBe(true);
		expect(enzymeWrapper.find('input').first().hasClass('form-control')).toBe(true);
		expect(enzymeWrapper.find('label').first().text()).toBe('Username');
		expect(enzymeWrapper.find('form').hasClass('form')).toBe(false);
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