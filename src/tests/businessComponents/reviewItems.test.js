import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import ReviewItems from '../../Components/businessComponents/reviewItems';


function setup() {
	const props = {
		review: {
			title: 'test',
			body: 'review',
		},
		index: 1,
	};

	const enzymeWrapper = mount(<ReviewItems {...props} />);
	return {
		props,
		enzymeWrapper,
	};
}
describe('Review items component', () => {
	it('should render component', () => {
		const { enzymeWrapper } = setup();
		expect(enzymeWrapper.find('h5').props().children).toBe('test');
	});
});
