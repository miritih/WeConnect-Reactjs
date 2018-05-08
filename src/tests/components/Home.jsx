import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../../Components/Home';
import { MemoryRouter as Router } from 'react-router-dom';
// import renderer for snapshot testing
import renderer from 'react-test-renderer';

describe('Home', () => {
	it('renders without crashing', () => {
		const pathname = {
			pathname: '/'
		};
		const rendered = renderer.create(
			<Router><Home location={pathname} /></Router>
		);
		expect(rendered.toJSON()).toMatchSnapshot();
	});
});
