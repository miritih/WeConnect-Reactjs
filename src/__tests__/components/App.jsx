import React from 'react';
import App from '../../App';
import { MemoryRouter as Router } from 'react-router-dom';
// import renderer for snapshot testing
import renderer from 'react-test-renderer';
/* global expect*/
describe('App', () => {
  it('renders without crashing', () => {
    const pathname = {
      pathname: "/"
    };
    const rendered = renderer.create(
      <Router><App location={pathname} /></Router>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
