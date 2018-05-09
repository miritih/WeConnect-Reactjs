import React from 'react';
import { Link } from 'react-router-dom';

class ProfileNav extends React.Component {
	render() {
		return (
			<ul className="list-group">
				<li className="list-group-item list-group-item-dark">My Dashboard</li>
				<li className="list-group-item">
					<Link className="dropdown-item" to="/profile/update">Edit Profile</Link>
				</li>
				<li className="list-group-item">
					<Link className="dropdown-item" to="/profile/admin">Change Password</Link>
				</li>
				<li className="list-group-item">
					<Link className="dropdown-item" to="/profile/business">Your Businesses</Link>
				</li>
			</ul>
		);
	}
}

export default ProfileNav;
