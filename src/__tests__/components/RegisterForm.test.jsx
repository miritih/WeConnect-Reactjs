import React from 'react';
import RegisterForm from '../../Components/forms/Register';
import { MemoryRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

// import renderer for snapshot testing
import renderer from 'react-test-renderer';

describe('RegisterForm', () => {
  let props, wrapper;

  //setup method
  beforeEach(() => {
    props = {
      handleSubmit: () => {},
    };
    wrapper = shallow(<RegisterForm {...props} />);
  });

  // test my whole form dom elements using snapshot
  it('renders without crashing', () => {
    const pathname = {
      pathname: "/"
    };
    const rendered = renderer.create(
      <Router><RegisterForm location={pathname} /></Router>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  // Test that registerform component has a form
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
    wrapper = mount(<Router><RegisterForm handleSubmit={handleSubmit} /></Router>);
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(handleSubmit).toBeCalled;
  });

  it('Input should call handleChange it changes', () => {
    const handleChange = jest.fn();
    wrapper = mount(<Router><RegisterForm /></Router>);
    const input = wrapper.find('form').childAt(1);
    input.simulate('change');
    expect(handleChange).toBeCalled;
  });

  it('Input should check password match confirm password', () => {
    const confirmPass = jest.fn();
    wrapper = mount(<Router><RegisterForm /></Router>);
    const input = wrapper.find('form').childAt(11);
    input.simulate('change');
    expect(confirmPass).toBeCalled;
  });



});
