import React from 'react';
import { mount } from 'enzyme';
import InputField from '../../Components/inputs/InputField';
import expect from 'expect';

function setup() {
	const props = {
		name: 'test',
		type: 'text',
		label: 'input',
		disabled: 'disabled', 
		required:'required',
		onChange: jest.fn(), 
		placeholder:'place holder', 
		value: 'value',
		error: ['error']
	};

	const enzymeWrapper = mount(<InputField {...props} />);
	return {
		props,
		enzymeWrapper
	};
}
describe('InputField components', () => {
	describe('Text field ', () => {
		it('should render input field', () => {
			const { enzymeWrapper } = setup();

			expect(enzymeWrapper.find('div').hasClass('form-group')).toBe(true);
			expect(enzymeWrapper.find('input').hasClass('form-control')).toBe(true);
			expect(enzymeWrapper.find('label').text()).toBe('input');
			expect(enzymeWrapper.find('small').hasClass('text-danger')).toBe(true);
		});

		it('should call onChange if length of text is greater than 0', () => {
			const { enzymeWrapper, props } = setup();
			const input = enzymeWrapper.find('InputField');
			input.props().onChange('');
			expect(props.onChange.mock.calls.length).toBe(1);
			
		});
	});
});