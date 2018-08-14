import React from 'react';
import { Link } from 'react-router-dom';

class ProfileNav extends React.Component {
	render() {
		const path = this.props.history.location.pathname;
		return (
			<ul className="list-group">
				<li className="list-group-item list-group-item-dark">Manage Profile</li>
				<li className={path === '/profile/update' ? 'list-group-item active' : 'list-group-item'}>
					<Link className="dropdown-item" to="/profile/update">Edit Profile</Link>
				</li>
				<li className={path === '/profile/admin' ? 'list-group-item active' : 'list-group-item'}>
					<Link className="dropdown-item" to="/profile/admin">Change Password</Link>
				</li>
			</ul>
		);
	}
}

export default ProfileNav;
