import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authservice from './AuthService';

const Auth = new Authservice();
/**
	 * method checks if a user is logged in before accessing a component
	 * if user is not authenticated, redirect them to login page
*/
const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => (Auth.isLoggedIn() ? (<Component {...props} />) : (
			<Redirect // redirect users not logged in
				to={{
					pathname: '/login',
				}}
			/>))
		}
	/>
);

export default PrivateRoute;
