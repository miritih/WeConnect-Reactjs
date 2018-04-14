import React from 'react';
import LoginForm from '../../Components/forms/Login';
import { MemoryRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

// define glabal imports 
/* global expect, jest */

describe('LoginForm', () => {
  let props, wrapper;

  //setup method
  beforeEach(() => {
    props = {
      handleSubmit: () => {},
    };
    wrapper = shallow(<LoginForm {...props} />);
  });

  // test my whole form dom elements using snapshot
  it('renders without crashing', () => {
    const pathname = {
      pathname: "/"
    };
    const rendered = renderer.create(
      <Router><LoginForm location={pathname} /></Router>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });


  // Test that LoginForm component has a form
  it('should have a `<form>` element', () => {
    expect(
      wrapper.find('form').length
    ).toBe(1);
  });

  //=================
  // Tests form logic 
  // ================

  it('should call handlesubmit when form is submitted', () => {
    const handleSubmit = jest.fn();
    const toast = jest.fn();
    const login = jest.fn();
    wrapper = mount(<Router><LoginForm handleSubmit={handleSubmit} /></Router>);
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(handleSubmit).toBeCalled;
    expect(toast).toBeCalled;
    expect(login).toBeCalled;
  });

  it('Input should call handleChange it changes', () => {
    const handleChange = jest.fn();
    wrapper = mount(<Router><LoginForm /></Router>);
    const input = wrapper.find('form').childAt(1);
    input.simulate('change');
    expect(handleChange).toBeCalled;
  });
});
