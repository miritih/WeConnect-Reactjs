import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import BusinessList from '../../Components/businessComponents/businessList';


function setup() {
	const props = {
		businesses: {
			businesses: [{
				category: 'Technology',
				description: 'Google',
				id: 2,
				location: 'Menlo Park, California',
				logo: 'download_2_rsk0kc',
				name: 'Google LLC',
			}],
			page: 1,
			total_pages: 3,
		},
		onView: jest.fn(),
		onPaginate: jest.fn(),
	};

	const enzymeWrapper = mount(<BusinessList {...props} />);
	return {
		props,
		enzymeWrapper,
	};
}
describe('Business List component', () => {
	it('should render component', () => {
		const { enzymeWrapper } = setup();
		expect(enzymeWrapper.find('h3').hasClass('text-center')).toBe(true);
		expect(enzymeWrapper.find('div').first().hasClass('container')).toBe(true);
		expect(enzymeWrapper.find('h5').props().children).toBe('Google LLC');
		expect(enzymeWrapper.find('ul').hasClass('pagination')).toBe(true);
	});
});
