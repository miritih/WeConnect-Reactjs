import React from 'react';
import { Link } from 'react-router-dom';
import Authservice from './Auth/AuthService';
import { toast } from 'react-toastify';

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      isloggedin: false,
      user: []
    };
    this.Auth = new Authservice();

  }

  handleLogout(e) {
    e.preventDefault();
    this.Auth.logout();
    this.setState({
      isloggedin: this.Auth.isLoggedIn()
    });
    toast.success(({ closeToast }) => <div>
          <h3>Success</h3>
              <p>You have been successfully Logged out
              </p>
    </div>);
  }
  componentWillMount() {
    this.setState({
      isloggedin: this.Auth.isLoggedIn(),
      user: this.Auth.getUser()
    });
  }
  componentDidMount() {
    this.setState({
      isloggedin: this.Auth.isLoggedIn(),
      user: this.Auth.getUser()
    });
  }
  render() {
    return (
      <nav className={
      ('/'=== this.props.location.pathname ?
      "navbar navbar-expand-lg navhome navbar-light bg-transparent fixed-top" : 
      "navbar navbar-expand-lg navbar-light fixed-top navbarcolor" 
      )}>
        <Link className="navbar-brand" to="/">
        <span className={(
            '/' === this.props.location.pathname ?
              'white' : ''
        )}>WeConnect</span>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
        data-target="#topnav" aria-controls="topnav" aria-expanded="false"
        aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="topnav">
          <ul className={"navbar-nav ml-auto "+('/'=== this.props.location.pathname ? 'white' : '')}>
           <li className="nav-item">
             <Link className="nav-link" to="/">Home</Link>
          </li>
           {this.state.isloggedin ?
           <span>
           <li className="nav-item">
            <Link className="nav-link" to="/register_business">Register business</Link>
          </li>
          </span>
            :
          <li className="nav-item">
            <Link className="nav-link" to="/register">Signup</Link>
          </li>
           }
          {this.state.isloggedin ?
          <li className="nav-item">
             <Link className="nav-link" to="/logout" onClick={this.handleLogout.bind(this)}>Logout</Link>
          </li>
            :
            <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          }
          {this.state.isloggedin ?
          <li className="nav-item">
           <a  className="nav-link">Welcome {this.state.user['username']}</a>
          </li>
            :
            ''
          }
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
