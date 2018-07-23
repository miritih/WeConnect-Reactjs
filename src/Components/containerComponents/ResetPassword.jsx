import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import NavBar from '../common/NavBar';
import ResetPassForm from '../forms/ResetPasswordForm';
import * as loginActions from '../../actions/loginActions';
import * as resetPassActions from '../../actions/ResetPasswordActions';

class ForgotPassword extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			errors: {}
		};
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
		// logic goes here
		this.props.resetPassActions.resetPassword(this.state.email).then(res => {
			console.log(res.status);
			if (res.status === 200) {
				this.props.history.replace('/login');
			}
		});
	}

	render() {
		const props = this.props;
		return (
			<div>
				<NavBar
					history={props.history}
					loggedIn={props.loggedIn}
					user={props.currentUser.user}
					location={props.location}
					actions={props.loginActions}
				/>
				<ResetPassForm
					handleChange={this.handleChange}
					email={this.state.email}
					error={props.passwordReset['0']}
					handleSubmit={this.handleSubmit}
				/>
			</div>
		);
	}
}
ForgotPassword.propType = {
	currentUser: PropTypes.object.isRequired,
	loggedIn: PropTypes.bool.isRequired,
	actions: PropTypes.object.isRequired
};
function mapStateToProps(state) {
	const {
		currentUser,
		loggedIn,
		passwordReset
	} = state;
	return {
		currentUser,
		loggedIn,
		passwordReset
	};
}
function mapDispatchToProps(dispatch) {
	return {
		loginActions: bindActionCreators(loginActions, dispatch),
		resetPassActions: bindActionCreators(resetPassActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
