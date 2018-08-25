import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { Image } from 'cloudinary-react';
import { cloudName } from '../../utils/Config';
import NavBar from '../common/NavBar';
import ReviewForm from '../forms/reviewsForm';
import Item from '../businessComponents/reviewItems';
import * as BusinessProfileActions from '../../actions/businessProfileAction';

class BusinessProfile extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		const id = this.props.match.params.id;
		this.props.actions.viewUserBusiness(id);
		this.props.actions.loadBusinessReviews(id);
	}

	handleChange(e) {
		this.props.actions.inputChange({
			prop: e.target.name, value: e.target.value,
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const { review, title, id } = this.props.businessProfile;
		this.props.actions.addReview({ review, title, id });
		document.getElementById('revieWModal').click();
		this.props.actions.loadBusinessReviews(id);
	}


	render() {
		const props = this.props;
		const business = props.businessProfile;
		const Loading = (
			<div className="container bsprofile">
				<br />
				<div className="row">
					<div className="loading">
						<img src="/img/spinner.gif" alt="loading" />
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
				<div className="jumbotron" />
				{ props.businessProfile.loading ? Loading
					: (
						<div className="container">
							<section className="bsprofile">
								<div className="card  w-100">
									<div className="card-body">

										<div className="row container">
											<div className="col-md-2 d-sm-none d-md-block">
												{/* <a className="btn btn-secondary">
													<i className="fa fa-arrow-left"/>
													Back
												</a> */}
											</div>
											<div className="col-md-4">
												<div className="profile-img">
													<Image cloudName={cloudName} publicId={business.logo} width="150" crop="scale" />
												</div>
											</div>
											<div className="col-md-6">
												<h4>{business.name}</h4>
												<p>{business.description}</p>
											</div>
										</div>
										<div>

											{props.userLogin.isLoggedIn
												? <a className="btn btn-primary float-right" href=".newReviewModal" data-toggle="modal" data-target=".newReviewModal">Add review</a>
												:	''
											}

										</div>
										<br /><br />

										{
											(business.error.message !== undefined)
												? <div className="alert text-center col-md-8 offset-md-2 alert-info">{business.error.message}</div>
												:											business.reviews.reviews !== undefined
													? business.reviews.reviews.map((review, i) => {
														return <Item review={review} key={i} />;
													})
													: ''
										}
									</div>
								</div>
							</section>
						</div>
					)
				}
				<ReviewForm
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					title={business.title}
					review={business.review}
					errors={business.error}
				/>
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
		businessProfile,
		userLogin,
	} = state;
	return {
		currentUser,
		businessProfile,
		userLogin,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(BusinessProfileActions, dispatch),
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfile);
