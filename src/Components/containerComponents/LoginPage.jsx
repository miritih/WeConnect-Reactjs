import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
// import components 
import LoginForm from '../forms/LoginForm';
import NavBar from '../common/NavBar';
import Authservice from '../Auth/AuthService';
import * as loginActions from '../../actions/loginActions';
import * as loadUser from '../../actions/UserAction';

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
		this.auth = new Authservice();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		this.auth.login(this.state.username, this.state.password)
			.then(res => {
				if (res.status >= 200 && res.status < 300) {
					this.props.userActions.loadCurrentUser();
					this.props.actions.setLoggedIn();

					this.props.history.replace('/');
					toast.success(() => <div>
						<h3>Success</h3>
						<p>Logged in successfully</p>
					</div>);
				}
				else {
					this.setState({
						username: '',
						password: ''
					});
					// create the error message container
					// this willl be shown in our notification
					toast.error(() =>
						<div>
							<h3>Opps!!</h3>
							<p>Wrong Username or password entered</p>
						</div>
					);
				}
			})
			.catch(err => {
				toast.error(() => <div>
					<h3>Opps!!</h3>
					<p>Sorry! Something went wrong. If the problem persist, contact support</p>
				</div>);
			});
	}
	componentWillMount() {
		if (this.props.loggedIn)
			this.props.history.replace('/');
	}
	render() {
		return (
			<div>
				<NavBar
					history={this.props.history}
					loggedIn={this.props.loggedIn}
					user={this.props.currentUser.user}
					location={this.props.location}
					actions={this.props.actions}
				/>
				<LoginForm
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
				/>
			</div>
		);
	}
}
LoginPage.propType = {
	currentUser: PropTypes.object.isRequired,
	loggedIn: PropTypes.bool.isRequired,
	actions: PropTypes.object.isRequired,
	userActions: PropTypes.object
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		loggedIn: state.loggedIn
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(loginActions, dispatch),
		userActions: bindActionCreators(loadUser, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
