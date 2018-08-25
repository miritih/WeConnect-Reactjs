import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
// import components
import LoginForm from '../forms/LoginForm';
import NavBar from '../common/NavBar';
import * as loginActions from '../../actions/loginActions';
import * as loadUser from '../../actions/UserAction';

export class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.props.actions.inputChange({ prop: e.target.name, value: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		const {
			username,
			password,
		} = this.props.userLogin;
		this.props.actions.loginUser({ username, password });
	}

	render() {
		const props = this.props;
		if (props.userLogin.redirect) {
			return <Redirect to="/" />;
		}
		return (
			<div>
				<NavBar
					history={props.history}
					loggedIn={props.userLogin.isLoggedIn}
					user={props.currentUser}
					location={props.location}
					actions={props.actions}
				/>
				<LoginForm
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					username={props.userLogin.username}
					password={props.userLogin.password}
				/>
			</div>
		);
	}
}
LoginPage.propType = {
	currentUser: PropTypes.object.isRequired,
	userLogin: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	userActions: PropTypes.object,
};

function mapStateToProps(state) {
	const { currentUser, userLogin } = state;
	return {
		currentUser,
		userLogin,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(loginActions, dispatch),
		userActions: bindActionCreators(loadUser, dispatch),
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
