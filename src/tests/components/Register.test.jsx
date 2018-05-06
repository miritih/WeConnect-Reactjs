import React from 'react';
import ReactDOM from 'react-dom';
import Register from '../../Components/Register';
import { MemoryRouter as Router } from 'react-router-dom';
// import renderer for snapshot testing
import renderer from 'react-test-renderer';

describe('Register', () => {
  it('renders without crashing', () => {
    const pathname = {
      pathname: "/"
    };
    const rendered = renderer.create(
      <Router><Register location={pathname} /></Router>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
