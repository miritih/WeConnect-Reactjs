import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
// import components 
import Form from '../forms/RegisterForm';
import NavBar from '../common/NavBar';
import * as RegisterUserActions from '../../actions/UserAction';

class RegisterPage extends React.Component {
	render() {
		const props = this.props;
		return (
			<div>
				<NavBar
					history={props.history}
					loggedIn={props.loggedIn}
					user={props.currentUser.user}
					location={props.location}
					actions={props.actions}
				/>
				<Form history={props.history} />
			</div>
		);
	}
}

RegisterPage.propType = {
	currentUser: PropTypes.object.isRequired,
	loggedIn: PropTypes.bool.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		currentUser: state.activeUser,
		loggedIn: state.loggedIn
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(RegisterUserActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
