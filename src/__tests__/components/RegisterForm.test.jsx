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

  it('renders without crashing', () => {
    const pathname = {
      pathname: "/"
    };
    const rendered = renderer.create(
      <Router><RegisterForm location={pathname} /></Router>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('should have a `<form>` element', () => {
    expect(
      wrapper.find('form').length
    ).toBe(1);
  });

  it('should call handlesubmit when form is submitted', () => {
    const handleSubmit = jest.fn();
    wrapper = mount(<Router><RegisterForm handleSubmit={handleSubmit} /></Router>);
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(handleSubmit).toBeCalled;
  });

});
