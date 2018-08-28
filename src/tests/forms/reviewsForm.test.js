import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import ReviewsForm from '../../Components/forms/reviewsForm';


function setup() {
	const props = {
		handleChange: jest.fn(),
		handleSubmit: jest.fn(),
		loading: true,
		errors: ['error'],
		title: 'title',
		review: 'review',
	};

	const enzymeWrapper = mount(<ReviewsForm {...props} />);
	return {
		props,
		enzymeWrapper,
	};
}
describe('Reviews form component', () => {
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

	it('should call handleSubmit on form submit', () => {
		const { enzymeWrapper, props } = setup();
		const form = enzymeWrapper.find('form');
		form.props().onSubmit();
		expect(props.handleSubmit.mock.calls.length).toBe(1);
	});

	it('should disable button when loading', () => {
		const { enzymeWrapper } = setup();
		const btn = enzymeWrapper.find('button').get(1);
		expect(btn.props.disabled).toBe('disabled');
	});
});
