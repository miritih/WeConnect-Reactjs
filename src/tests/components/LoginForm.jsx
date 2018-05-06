import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import LoginForm from '../../Components/forms/Login';
// define glabal imports
/* global it expect, jest describe */

describe('LoginForm', () => {
  let props;
  let wrapper;
  // setup method

  // test my whole form dom elements using snapshot
  it('renders without crashing', () => {
    const pathname = {
      pathname: '/',
    };
    const rendered = renderer.create(<Router><LoginForm location={pathname} /></Router>);

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  // Test that LoginForm component has a form
  it('should have a `<form>` element', () => {
    wrapper = shallow(<LoginForm {...props} />);
    expect(wrapper.find('form').length).toBe(1);
  });

  // =================
  // Tests form logic
  // ================

  it('should call handlesubmit when form is submitted', () => {
    const handleSubmit = jest.fn();
    wrapper = mount(<Router><LoginForm handleSubmit={handleSubmit} /></Router>);
    const form = wrapper.find('form');
    form.simulate('submit', handleSubmit);
    expect(handleSubmit).toBeCalled();
  });

  it('Input should call handleChange it changes', () => {
    const handleChange = jest.fn();
    const event = {
      target: { value: 'the-value' },
    };
    wrapper = shallow(<LoginForm />);
    const input = wrapper.find('form').childAt(1);
    console.log(input.props());
    input.simulate('change', event);
    expect(handleChange).toBeCalled();
  });
});
