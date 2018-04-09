import React from 'react';
// import $ from 'jquery'
import Search from './Search';
import NavBar from './NavBar';

class Home extends React.Component {
  render() {
    return (
      <div className="jumbotron jumbotron-home">
      <NavBar 
        history={this.props.history} 
        location={this.props.location} 
      />
      <Search/>
    </div>
    );
  }
}

export default Home;
