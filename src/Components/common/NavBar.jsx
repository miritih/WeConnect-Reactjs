import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
		this.props.actions.isLoggedIn(); // sets logged in state to false after logout
		this.props.history.replace('/'); // redirect to home page
	}

	render() {
		const {
			location, loggedIn, user, actions,
		} = this.props;
		return (
			<div>
				<nav className={
					// apply transparent bg if on homepage
					(location.pathname === '/'
						? 'navbar navbar-expand-lg navhome navbar-light bg-transparent fixed-top'
						: 'navbar navbar-expand-lg navbar-light fixed-top navbarcolor'
					)}
				>
					<div className="container">
						<Link className="navbar-brand" to="/">
							<span
								className={( // if on homepage set brand color to white
									location.pathname === '/'
										? 'white' : ''
								)}
							>
								WeConnect
							</span>
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#topnav"
							aria-controls="topnav"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon" />
						</button>
						<div className="collapse navbar-collapse" id="topnav">
							{/* if on homepage set navlinks color to white */}
							<ul className={`navbar-nav ml-auto ${location.pathname === '/' ? 'white' : ''}`}>
								<NavLinks
									loggedIn={loggedIn}
									location={location}
									user={user}
									actions={actions}
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
NavBar.propTypes = {
	actions: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	user: PropTypes.object,
	loggedIn: PropTypes.bool,
};
NavBar.defaultProps = {
	user: {},
	loggedIn: false,
};
export default NavBar;
