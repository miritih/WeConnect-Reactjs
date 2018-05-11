import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
// import components 
import LoginForm from '../forms/LoginForm';
import NavBar from '../common/NavBar';
import * as loginActions from '../../actions/loginActions';
import * as loadUser from '../../actions/UserAction';
class LoginPage extends Component {
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
					actions={this.props.actions}
					userActions={this.props.userActions}
					history={this.props.history} />
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

function mapStateToProps(state, ownState) {
	return {
		currentUser: state.activeUser,
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
