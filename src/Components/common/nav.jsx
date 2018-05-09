import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';

const Nav = ({ history, loggedIn, user, location }) => {
	return (
		<div>
			<nav className={
				// apply transparent bg if on homepage
				('/' === location.pathname ?
					'navbar navbar-expand-lg navhome navbar-light bg-transparent fixed-top' :
					'navbar navbar-expand-lg navbar-light fixed-top navbarcolor'
				)}>
				<div className="container">
					<Link className="navbar-brand" to="/">
						<span className={( //if on homepage set brand color to white
							'/' === location.pathname ?
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
						<ul className={'navbar-nav ml-auto ' + ('/' === location.pathname ? 'white' : '')}>
							<NavLinks loggedIn={loggedIn} location={location} user={user} />
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};
Nav.propTypes = {
	loggedIn: PropTypes.bool.isRequired,
	user: PropTypes.object,
	location: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};
export default Nav;