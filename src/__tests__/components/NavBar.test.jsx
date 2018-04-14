import React from 'react';
import NavBar from '../../Components/NavBar';
import Authservice from '../../Components/Auth/AuthService';
import { mount } from 'enzyme';
// import react router from react-router-dom
import { MemoryRouter as Router } from 'react-router-dom';
// import renderer for snapshot testing
import renderer from 'react-test-renderer';

describe('NavBar', () => {

  let wrapper;
  const pathname = {
    pathname: "/login"
  };

  it('renders without crashing', () => {
    const rendered = renderer.create(
      <Router><NavBar location={pathname} /></Router>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('should call handlesubmit when form is submitted', () => {
    const handleLogout = jest.fn();
    wrapper = mount(<Router><NavBar location={pathname}/></Router>);
    const li = wrapper.find('ul').childAt(2);
    li.simulate('click');
    expect(handleLogout).toBeCalled;
  });
});
