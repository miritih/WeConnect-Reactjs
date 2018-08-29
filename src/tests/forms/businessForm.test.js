import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import BusinessForm from '../../Components/forms/businessForm';


function setup() {
	const props = {
		handleChange: jest.fn(),
		handleSubmit: jest.fn(),
		handleDrop: jest.fn(),
		onclose: jest.fn(),
		uploading: false,
		loading: false,
		errors: 'error',
		edit: false,
		name: 'test',
		category: 'test',
		location: 'test',
		logo: 'test',
		description: 'test',
	};

	const enzymeWrapper = mount(<BusinessForm {...props} />);
	return {
		props,
		enzymeWrapper,
	};
}
describe('Business form component', () => {
	it('should render component', () => {
		const { enzymeWrapper } = setup();
		expect(enzymeWrapper.find('button').first().hasClass('close')).toBe(true);
		expect(enzymeWrapper.find('input').first().hasClass('form-control')).toBe(true);
		expect(enzymeWrapper.find('form').hasClass('form')).toBe(true);
	});

	it('should call handleChange on input change', () => {
		const { enzymeWrapper, props } = setup();
		const input = enzymeWrapper.find('input').first();
		input.props().onChange();
		expect(props.handleChange.mock.calls.length).toBe(1);
	});

	it('should call onclose on modal close', () => {
		const { enzymeWrapper, props } = setup();
		const input = enzymeWrapper.find('button').first();
		input.props().onClick();
		expect(props.onclose.mock.calls.length).toBe(1);
	});

	it('should call handleSubmit on form submit', () => {
		const { enzymeWrapper, props } = setup();
		const form = enzymeWrapper.find('form');
		form.props().onSubmit();
		expect(props.handleSubmit.mock.calls.length).toBe(1);
	});

	it('should change title on edit', () => {
		const { enzymeWrapper } = setup();
		const h5 = enzymeWrapper.find('h5');
		expect(h5.props().children).toBe('Register business');
	});
});
