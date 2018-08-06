import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { Image } from 'cloudinary-react';
import { cloudName } from '../../utils/Config';
import NavBar from '../common/NavBar';
import * as RegisterUserActions from '../../actions/registerUserAction';

class BusinessProfile extends React.Component {
	render() {
		const props = this.props;
		return (
			<div>
				<NavBar
					history={props.history}
					loggedIn={props.userLogin.isLoggedIn}
					user={props.currentUser}
					location={props.location}
					actions={props.actions}
				/>
				<div className="jumbotron">
				</div>
				
				<div className="container">
					{/* <!--business--> */}
					<section className="bsprofile">
						<div className="card  w-100">
							<div className="card-body">
								{/* <!--EOF business-info info--> */}
								<div className="row container">
									<div className="col-md-6">
										<div className="profile-img">
											<Image cloudName={cloudName} publicId='download_qfbj36' width="195" crop="scale" />
										</div>
									</div>
									<div className="col-md-6">
										<h4>Business name</h4>
										<p>Small description about the business</p>
									</div>
								</div>
								<hr/>
								{/* <!--EOF business-info info--> */}
								<div className="reviews">
									<Image cloudName={cloudName} publicId='download_qfbj36' width="90" crop="scale" />
									<h5> review title</h5>
									<p>Review content</p>
								</div>
								<hr/>
								<div className="reviews">
									<Image cloudName={cloudName} publicId='download_qfbj36' width="90" crop="scale" />
									<h5> review title</h5>
									<p>Review content</p>
								</div>
								<hr/>
								<div className="reviews">
									<Image cloudName={cloudName} publicId='download_qfbj36' width="90" crop="scale" />
									<h5> review title</h5>
									<p>Review content</p>
								</div>
							</div>
						</div>
					</section>
				</div>


			</div>
		);
	}
}

BusinessProfile.propType = {
	currentUser: PropTypes.object,
	userLogin: PropTypes.object,
	actions: PropTypes.object,
};

function mapStateToProps(state) {
	const {
		currentUser,
		userLogin,		
	} = state;
	return {
		currentUser,
		userLogin
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(RegisterUserActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfile);
