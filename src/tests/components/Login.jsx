import React from 'react';
import { mount } from 'enzyme';
import Login from '../../Components/Auth/Login';
import PrivateRoute from '../../Components/Auth/PrivateRoute';
import { MemoryRouter as Router } from 'react-router-dom';
// import renderer for snapshot testing
import renderer from 'react-test-renderer';
/* global expect,jest*/
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

describe('PrivateRoute', () => {
  let wrapper;
  it('renders without crashing', () => {
    const rendered = renderer.create(
      <Router><PrivateRoute /></Router>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('Input should call isLoggedIn', () => {
    const isLoggedIn = jest.fn();
    wrapper = mount(<Router><PrivateRoute /></Router>);
    expect(isLoggedIn).toBeCalled;
  });
});
