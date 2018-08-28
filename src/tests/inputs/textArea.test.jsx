import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import TextArea from '../../Components/inputs/textArea';

function setup() {
	const props = {
		rows: '10',
		cols: '9',
		name: 'test',
		type: 'text',
		label: 'input',
		disabled: 'disabled',
		required: 'required',
		onChange: jest.fn(),
		placeholder: 'place holder',
		value: 'value',
		error: ['error'],
	};

	const enzymeWrapper = mount(<TextArea {...props} />);
	return {
		props,
		enzymeWrapper,
	};
}
describe('TextArea component', () => {
	describe('Text Area ', () => {
		it('should render Text Area', () => {
			const { enzymeWrapper } = setup();

			expect(enzymeWrapper.find('div').hasClass('form-group')).toBe(true);
			expect(enzymeWrapper.find('textarea').hasClass('form-control')).toBe(true);
			expect(enzymeWrapper.find('label').text()).toBe('input');
			expect(enzymeWrapper.find('small').hasClass('text-danger')).toBe(true);
		});

		it('should call onChange if length of text is greater than 0', () => {
			const { enzymeWrapper, props } = setup();
			const input = enzymeWrapper.find('TextArea');
			input.props().onChange('');
			expect(props.onChange.mock.calls.length).toBe(1);
		});
	});
});
