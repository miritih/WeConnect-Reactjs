import React from 'react';
import ResetPass from '../../Components/ResetPass';
import { MemoryRouter as Router } from 'react-router-dom';
// import renderer for snapshot testing
import renderer from 'react-test-renderer';

describe('ResetPassword', () => {
  const pathname = {
    pathname: "/"
  };

  it('renders without crashing', () => {
    const rendered = renderer.create(
      <Router><ResetPass location={pathname} /></Router>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
