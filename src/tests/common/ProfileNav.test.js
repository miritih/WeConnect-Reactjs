import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileNav from '../../Components/common/ProfileNav';


function setup() {
	const props = {
		path: '/profile/update',
	};

	const enzymeWrapper = mount(<Router><ProfileNav {...props} /></Router>);
	return {
		props,
		enzymeWrapper,
	};
}
describe('Profile navigation component', () => {
	it('should render component', () => {
		const { enzymeWrapper } = setup();
		expect(enzymeWrapper.find('ul').hasClass('list-group')).toBe(true);
	});
});
