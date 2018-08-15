import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { cloudName } from '../../utils/Config';

const NavLinks = ({ loggedIn, user, handleLogout, location }) => {
	return (
		<ul className={'navbar-nav ml-auto ' + ('/' === location.pathname ? 'white' : '')}>
			<li className="nav-item">
				<Link className="nav-link" to="/">Home</Link>
			</li>
			{loggedIn ?
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
			{loggedIn ?

				<li className="nav-item dropdown">
					<a className="nav-link dropdown-toggle text-capitalize user-profile" href="avascript:;" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<Image cloudName={cloudName} publicId={user['image']} />
						{' ' + user['username']}
					</a>
					<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
						<Link className="dropdown-item" to="/profile/update">Manage Profile</Link>
						<Link className="dropdown-item" to="/logout" onClick={handleLogout}>Logout</Link>
					</div>
				</li>
				:
				<li className="nav-item">
					<Link className="nav-link" to="/login">Login</Link>
				</li>
			}
		</ul>
	);
};
NavLinks.propTypes = {
	loggedIn: PropTypes.bool.isRequired,
	user: PropTypes.object,
	handleLogout: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired
};
export default NavLinks;