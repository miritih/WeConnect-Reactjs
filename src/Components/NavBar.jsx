import React from 'react';
import { Link } from 'react-router-dom';
import Authservice from './Auth/AuthService';
import { toast } from 'react-toastify';
import { Image } from 'cloudinary-react';
import { cloudName } from '../utils/Config';

class NavBar extends React.Component {
	constructor() {
		super();
		this.state = {
			isloggedin: false,
			user: []
		};
		this.Auth = new Authservice();

	}
	handleLogout(e) {
		e.preventDefault();
		this.Auth.logout();
		this.setState({
			isloggedin: this.Auth.isLoggedIn()
		});
		this.props.history.replace('/');
		toast.success(({ closeToast }) => <div>
			<h3>Success</h3>
			<p>You have been successfully Logged out</p>
		</div>);
	}
	componentDidMount() {
		this.setState({
			isloggedin: this.Auth.isLoggedIn(),
			user: this.Auth.getUser()['user']
		});
	}
	render() {
		return (
			<div>
				<nav className={
					('/' === this.props.location.pathname ?
						'navbar navbar-expand-lg navhome navbar-light bg-transparent fixed-top' :
						'navbar navbar-expand-lg navbar-light fixed-top navbarcolor'
					)}>
					<div className="container">
						<Link className="navbar-brand" to="/">
							<span className={(
								'/' === this.props.location.pathname ?
									'white' : ''
							)}>WeConnect</span>
						</Link>
						<button className="navbar-toggler" type="button" data-toggle="collapse"
							data-target="#topnav" aria-controls="topnav" aria-expanded="false"
							aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="topnav">
							<ul className={'navbar-nav ml-auto ' + ('/' === this.props.location.pathname ? 'white' : '')}>
								<li className="nav-item">
									<Link className="nav-link" to="/">Home</Link>
								</li>
								{this.state.isloggedin ?
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
								{this.state.isloggedin ?

									<li className="nav-item dropdown">
										<a className="nav-link dropdown-toggle text-capitalize user-profile" href="avascript:;" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<Image cloudName={cloudName} publicId={this.state.user['image']} />
											{' ' + this.state.user['username']}
										</a>
										<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
											<Link className="dropdown-item" to="/profile/update">Manage Profile</Link>
											<Link className="dropdown-item" to="/logout" onClick={this.handleLogout.bind(this)}>Logout</Link>
										</div>
									</li>
									:
									<li className="nav-item">
										<Link className="nav-link" to="/login">Login</Link>
									</li>
								}
							</ul>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

export default NavBar;
