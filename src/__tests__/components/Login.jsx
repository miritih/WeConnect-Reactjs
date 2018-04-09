import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../../Components/Auth/Login';
import { MemoryRouter as Router } from 'react-router-dom';
// import renderer for snapshot testing
import renderer from 'react-test-renderer';

describe('Login', () => {
  it('renders without crashing', () => {
    const pathname = {
      pathname: "/"
    };
    const rendered = renderer.create(
      <Router><Login location={pathname} /></Router>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
