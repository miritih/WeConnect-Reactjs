import React from 'react';
import { ToastContainer } from 'react-toastify';
// import react router
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import components
import Home from './Components/containerComponents/HomePage';
import RegisterPage from './Components/containerComponents/RegisterPage';
import Profile from './Components/containerComponents/ProfilePage';
import ChangePass from './Components/containerComponents/ChangePassPage';
import Login from './Components/containerComponents/LoginPage';
import PrivateRoute from './Components/Auth/PrivateRoute';
import ForgotPassword from './Components/containerComponents/ResetPassword';
//create a router 
const router = (
	<Router>
		<div>
			<Route exact path='/' component={Home} />
			<Route exact path='/register' component={RegisterPage} />
			<Route exact path='/login' component={Login} />
			<PrivateRoute exact path='/profile/update' component={Profile} />
			<PrivateRoute exact path='/profile/admin' component={ChangePass} />
			<Route exact path='/forgotpass' component={ForgotPassword} />
			<ToastContainer />
		</div>
	</Router>
);

class Routes extends React.Component {
	render() {
		return (
			router
		);
	}
}

export default Routes;
