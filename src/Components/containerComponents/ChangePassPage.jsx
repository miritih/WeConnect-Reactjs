import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import NavBar from '../common/NavBar';
import ProfileNav from '../common/ProfileNav';
import ResetPassForm from '../forms/ChangePassForm';
import * as loginActions from '../../actions/loginActions';
import * as resetPassActions from '../../actions/ResetPasswordActions';


class ResetPass extends React.Component {
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.props.resetPassActions.inputChange({ prop: e.target.name, value: e.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		const data = {
			password: this.props.passwordReset.new_password,
			old_password: this.props.passwordReset.old_password,
		};
		this.props.resetPassActions.updatePassword(data);
	}

	render() {
		const props = this.props;
		const field = props.passwordReset;
		return (
			<div>
				<NavBar
					history={props.history}
					loggedIn={props.userLogin.isLoggedIn}
					user={props.currentUser}
					location={props.location}
					actions={props.actions}
				/>
				<div className="container profile">
					<div className="card">
						<div className="card-body">
							<div className="row">
								<div className="col-sm-3">
									<ProfileNav
										history={props.history}
									/>
								</div>
								<div className="col-sm-9"><h5>Reset Password</h5>
									<hr />
									<ResetPassForm
										handleChange={this.handleChange}
										handleSubmit={this.handleSubmit}
										old_password={field.old_password}
										new_password={field.new_password}
										confirm_password={field.confirm_password}
										errors={field.errors}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
ResetPass.propType = {
	currentUser: PropTypes.object.isRequired,
	loggedIn: PropTypes.bool.isRequired,
	actions: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
	const { currentUser, passwordReset, userLogin } = state;
	return {
		currentUser,
		passwordReset,
		userLogin,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(loginActions, dispatch),
		resetPassActions: bindActionCreators(resetPassActions, dispatch),

	};
}
export default connect(mapStateToProps, mapDispatchToProps)(ResetPass);
