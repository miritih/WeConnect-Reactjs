import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../actions/loginActions';
import NavBar from '../common/NavBar';
import ProfileNav from '../common/ProfileNav';
import ProfileUpdate from '../forms/ProfileUpdate';
class Profile extends React.Component {
	render() {
		const props = this.props;
		return (
			<div>
				<NavBar
					history={props.history}
					loggedIn={props.userLogin.isLoggedIn}
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
								<div className="col-sm-9"><h5>Edit Profile</h5>
									<hr />
									<ProfileUpdate />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
Profile.propType = {
	currentUser: PropTypes.object.isRequired,
	loggedIn: PropTypes.bool.isRequired,
	actions: PropTypes.object.isRequired
};
function mapStateToProps(state, ownState) {
	const {
		currentUser,
		userLogin
	} = state;
	return {
		currentUser,
		userLogin
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(loginActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
