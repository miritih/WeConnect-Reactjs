import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { Image } from 'cloudinary-react';
import { cloudName } from '../../utils/Config';
import NavBar from '../common/NavBar';
import * as UserBusinessActions from '../../actions/userBusinessAction';

class BusinessProfile extends React.Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		const id = this.props.match.params.id;
		this.props.actions.viewUserBusinesses(id);
	}
	render() {
		const props = this.props;
		const business = props.userBusinesses.business;
		const Loading =(
			<div className="container bsprofile">
				<h3 className="text-center text-success"></h3>
				<br/>
				<div className="row">
					<div className="loading">
						<img src='/img/spinner.gif' alt="loading"/>
						<i>loading ...</i>
					</div>
				</div>
			</div>
		);
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
				{ props.userBusinesses.loading ? Loading :
					<div className="container">
						<section className="bsprofile">
							<div className="card  w-100">
								<div className="card-body">
									<div className="row container">
										<div className="col-md-6">
											<div className="profile-img">
												<Image cloudName={cloudName} publicId={business.logo} width="195" crop="scale" />
											</div>
										</div>
										<div className="col-md-6">
											<h4>{business.name}</h4>
											<p>{business.description}</p>
										</div>
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
				}

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
		userBusinesses,
		userLogin,		
	} = state;
	return {
		currentUser,
		userBusinesses,
		userLogin
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(UserBusinessActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfile);
