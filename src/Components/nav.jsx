import React from 'react';
import { Link } from 'react-router-dom';
import Authservice from './Auth/AuthService';
import { toast } from 'react-toastify';
import { Image } from 'cloudinary-react';
import { cloudName } from '../utils/Config';

const Nav = ({ history, loggedIn, user, location }) => {
	return (
		<div>
			{loggedIn ?
				<p>{user.username}</p> :
				<p>{location.pathname}</p>
			}
		</div>
	);
};
export default Nav;