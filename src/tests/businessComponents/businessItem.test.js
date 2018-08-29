import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import BusinessItem from '../../Components/businessComponents/businessItem';


function setup() {
	const props = {
		business: {
			category: 'Technology',
			description: 'Google',
			id: 2,
			location: 'Menlo Park, California',
			logo: 'download_2_rsk0kc',
			name: 'Google LLC',
		},
		onView: jest.fn(),
		index: 2,
	};

	const enzymeWrapper = mount(<BusinessItem {...props} />);
	return {
		props,
		enzymeWrapper,
	};
}
describe('Business item component', () => {
	it('should render component', () => {
		const { enzymeWrapper } = setup();
		expect(enzymeWrapper.find('a').hasClass('btn-info')).toBe(true);
		expect(enzymeWrapper.find('h5').props().children).toBe('Google LLC');
	});

	it('should call onView on when viewing profile', () => {
		const { enzymeWrapper, props } = setup();
		const input = enzymeWrapper.find('a').first();
		input.props().onClick();
		expect(props.onView.mock.calls.length).toBe(1);
	});
});
