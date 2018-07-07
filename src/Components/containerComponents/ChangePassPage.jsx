import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../actions/loginActions';
import NavBar from '../common/NavBar';
import ProfileNav from '../common/ProfileNav';
import ResetPassForm from '../forms/ChangePassForm';
class ResetPass extends React.Component {
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
				<div className="container profile">
					<div className="card">
						<div className="card-body">
							<div className="row">
								<div className="col-sm-3">
									<ProfileNav />
								</div>
								<div className="col-sm-9"><h5>Reset Password</h5>
									<hr />
									<ResetPassForm />
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
	actions: PropTypes.object.isRequired
};
function mapStateToProps(state) {
	return {
		currentUser: state.activeUser,
		loggedIn: state.loggedIn
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(loginActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(ResetPass);
