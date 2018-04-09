import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../../Components/NavBar';
import { shallow } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
describe('NavBar', () => {
  // test that the component will render properly without crushing 
  it('renders without crashing', () => {
    const pathname = {
      pathname: "/login"
    };
    const div = document.createElement('div');
    ReactDOM.render(<Router><NavBar location={pathname} /></Router>, div);
  });

});
