import React from 'react';
import ReactDOM from 'react-dom';
import Register from '../../Components/Register';
import { MemoryRouter as Router } from 'react-router-dom';

describe('Register', () => {
  it('renders without crashing', () => {
    const pathname = {
      pathname: "/"
    };
    const div = document.createElement('div');
    ReactDOM.render(<Router><Register location={pathname} /></Router>, div);
  });
});
