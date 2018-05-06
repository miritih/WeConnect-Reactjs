import React from 'react';
// import components
import Home from './Components/Home';
import Register from './Components/Register';
import Profile from './Components/Profile';
import ResetPass from './Components/ResetPass';
import Login from './Components/Auth/Login';
import PrivateRoute from './Components/Auth/PrivateRoute';
// import PrivateRoute from './Components/Auth/PrivateRoute';
import { ToastContainer } from 'react-toastify';
// import react router deps
import { BrowserRouter as Router, Route } from 'react-router-dom';


//create a router 
const router = (
	<Router>
		<div>
		<Route exact path='/' component={Home} />
		<Route exact path='/register' component={Register} />
		<Route exact path='/login' component={Login} />
		<PrivateRoute exact path='/profile/update' component={Profile} />
		<PrivateRoute exact path='/profile/admin' component={ResetPass} />
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
