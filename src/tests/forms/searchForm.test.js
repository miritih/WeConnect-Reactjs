import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import SearchBizForm from '../../Components/forms/SearchForm';


function setup() {
	const props = {
		onSearch: jest.fn(),
		onChange: jest.fn(),
		value: 'test',
	};

	const enzymeWrapper = mount(<SearchBizForm {...props} />);
	return {
		props,
		enzymeWrapper,
	};
}
describe('Search form component', () => {
	it('should render component', () => {
		const { enzymeWrapper } = setup();
		expect(enzymeWrapper.find('button').hasClass('btn-outline-info')).toBe(true);
		expect(enzymeWrapper.find('input').hasClass('form-control')).toBe(true);
		expect(enzymeWrapper.find('form').hasClass('form-inline')).toBe(true);
	});

	it('should call onSearch on input change', () => {
		const { enzymeWrapper, props } = setup();
		const input = enzymeWrapper.find('input').first();
		input.props().onKeyUp();
		expect(props.onSearch.mock.calls.length).toBe(1);
	});

	it('should call onChange on input change', () => {
		const { enzymeWrapper, props } = setup();
		const input = enzymeWrapper.find('input').first();
		input.props().onChange();
		expect(props.onChange.mock.calls.length).toBe(1);
	});

	it('should call onSubmit on form submit', () => {
		const { enzymeWrapper, props } = setup();
		const form = enzymeWrapper.find('form');
		form.props().onSubmit();
		expect(props.onSearch.mock.calls.length).toBe(1);
	});
});
