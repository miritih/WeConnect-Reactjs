import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import components 
import Form from './forms/RegisterForm';
import Nav from './nav';
import * as RegisterUserActions from '../actions/UserAction';

class RegisterPage extends React.Component {
	render() {
		const props = this.props;
		return (
			<div>
				<Nav
					history={props.history}
					loggedIn={props.loggedIn}
					user={props.currentUser}
					location={props.location}
				/>
				<Form history={props.history} />
			</div>
		);
	}
}
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
