import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { BrowserRouter as Router } from 'react-router-dom';

import { Home } from '../../Components/containerComponents/HomePage';


function setup() {
	const props = {
		currentUser: {
			username: 'test',
			image: 'test',
		},
		businesses: {
			loading: false,
			businesses: [
				{
					category: 'Technology',
					created_at: 'Mon, 27 Aug 2018 19:41:24 GMT',
					description: 'Google LLC is a multinational',
					id: 2,
					location: 'Menlo Park, California',
					logo: 'download_2_rsk0kc',
					name: 'Google LLC',
					update_at: 'Mon, 27 Aug 2018 19:41:24 GMT',
					user_id: 1,
				}],
			page: 1,
			total_pages: 2,
		},
		actions: {
			isLoggedIn: jest.fn(),
		},
		location: {
			pathname: '/',
		},
		history: {
			goBack: jest.fn(),
			goForward: jest.fn(),
			replace: jest.fn(),
		},
	};

	const enzymeWrapper = mount(<Router><Home {...props} /></Router>);
	return {
		props,
		enzymeWrapper,
	};
}
describe('Change password component', () => {
	it('should render component', () => {
		const { enzymeWrapper } = setup();
		expect(enzymeWrapper.find('h3').props().children).toBe('Registered Businesses');
	});
});
