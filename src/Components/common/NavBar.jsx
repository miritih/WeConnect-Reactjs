import React from 'react';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import Authservice from '../Auth/AuthService';
const Auth = new Authservice();

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}
	handleLogout(e) {
		e.preventDefault();
		Auth.logout();
		this.props.actions.isLoggedIn(); //sets logged in state to false after logout
		this.props.history.replace('/'); // redirect to home page
	}
	render() {
		return (
			<div>
				<nav className={
					// apply transparent bg if on homepage
					('/' === this.props.location.pathname ?
						'navbar navbar-expand-lg navhome navbar-light bg-transparent fixed-top' :
						'navbar navbar-expand-lg navbar-light fixed-top navbarcolor'
					)}>
					<div className="container">
						<Link className="navbar-brand" to="/">
							<span className={( //if on homepage set brand color to white
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
							{/* if on homepage set navlinks color to white */}
							<ul className={'navbar-nav ml-auto ' + ('/' === this.props.location.pathname ? 'white' : '')}>
								<NavLinks
									loggedIn={this.props.loggedIn}
									location={this.props.location}
									user={this.props.user}
									actions={this.props.actions}
									handleLogout={this.handleLogout}
								/>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}
export default NavBar;