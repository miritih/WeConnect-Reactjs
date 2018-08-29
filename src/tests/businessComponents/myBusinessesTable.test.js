import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import BusinessesTable from '../../Components/businessComponents/myBusinessesTable';


function setup() {
	const props = {
		results:
			[{
				category: 'Technology',
				created_at: 'Mon, 27 Aug 2018 19:41:24 GMT',
				description: 'Google LLC is a multinational technology',
				id: 2,
				location: 'Menlo Park, California',
				logo: 'download_2_rsk0kc',
				name: 'Google LLC',
				update_at: 'Mon, 27 Aug 2018 19:41:24 GMT',
			}],
		onView: jest.fn(),
		onEdit: jest.fn(),
		onDelete: jest.fn(),
	};

	const enzymeWrapper = mount(<BusinessesTable {...props} />);
	return {
		props,
		enzymeWrapper,
	};
}
describe('Business Table component', () => {
	it('should render component', () => {
		const { enzymeWrapper } = setup();
		expect(enzymeWrapper.find('a').first().hasClass('link')).toBe(true);
	});
});
