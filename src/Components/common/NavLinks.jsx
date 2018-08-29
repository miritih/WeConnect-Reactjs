import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { cloudName } from '../../utils/Config';
/**
 * presentation component to dispalay navigation links
 * @param {*} loggedIn true or false, check if user is logged in
 * @param {*} user details of the user loogged in
 * @param {*} handleLogout method to log user out,
 * @param {*} location shows the current page user is viewing
 */
const NavLinks = ({
	loggedIn, user, handleLogout, location,
}) => (
	<ul className={`navbar-nav ml-auto ${location.pathname === '/' ? 'white' : ''}`}>
		<li className="nav-item">
			<Link className="nav-link" to="/">Home</Link>
		</li>
		{/*
		if user is logged in show profile links, else show login and signup
		*/}
		{loggedIn
			? (
				<span>
					<li className="nav-item">
						<Link className="nav-link" to="/admin/my-businesses">My Businesses</Link>
					</li>
				</span>
			)
			: (
				<li className="nav-item">
					<Link className="nav-link" to="/register">Signup</Link>
				</li>
			)
		}
		{loggedIn
			? (
				<li className="nav-item dropdown">
					<a
						className="nav-link dropdown-toggle text-capitalize user-profile"
						href=""
						id="navbarDropdownMenuLink"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						<Image cloudName={cloudName} publicId={user.image} />
						{user.username}
					</a>
					<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
						<Link className="dropdown-item" to="/profile/update">Profile</Link>
						<Link className="dropdown-item" to="/logout" onClick={handleLogout}>Logout</Link>
					</div>
				</li>
			)
			: (
				<li className="nav-item">
					<Link className="nav-link" to="/login">Login</Link>
				</li>
			)
		}
	</ul>
);
/**
 * validate all props received by this component
 */
NavLinks.propTypes = {
	loggedIn: PropTypes.bool.isRequired,
	user: PropTypes.object,
	handleLogout: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired,
};
// set default props for props not required.
NavLinks.defaultProps = {
	user: [],
};

export default NavLinks;
