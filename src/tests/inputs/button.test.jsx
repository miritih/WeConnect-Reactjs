import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import Button from '../../Components/inputs/Button';

function setup() {
	const props = {
		type: 'submit',
		loading: true,
		className: 'btn',
		text: 'save',
		disabled: 'disabled',
	};

	const enzymeWrapper = mount(<Button {...props} />);
	return {
		props,
		enzymeWrapper,
	};
}
describe('Button component', () => {
	it('should render Button', () => {
		const { enzymeWrapper } = setup();
		expect(enzymeWrapper.find('button').hasClass('btn')).toBe(true);
		expect(enzymeWrapper.find('span').text()).toBe('save');
	});
});
