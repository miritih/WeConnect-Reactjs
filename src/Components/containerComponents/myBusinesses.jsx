import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import axios from 'axios';
// import components
import NavBar from '../common/NavBar';
import * as loginActions from '../../actions/loginActions';
import * as bizActions from '../../actions/userBusinessAction';
import * as createAction from '../../actions/createBusinessAction';
import { Pagination } from '../../utils/paginate';
import ListTable from '../businessComponents/myBusinessesTable';
import BusinessForm from '../forms/businessForm';
import * as BusinessProfileActions from '../../actions/businessProfileAction';


class myBusinesses extends Component {
	constructor(props) {
		super(props);
		this.actions = 	this.props.actions;
		this.handleDrop = this.handleDrop.bind(this);
		this.onPaginate = this.onPaginate.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onView = this.onView.bind(this);
		this.onclose = this.onclose.bind(this);
	}

	/**
	* loads user business when page loads
	*/
	componentDidMount() {
		this.props.bizActions.loadUserBusinesses();
	}

	/**
	 * paginates user businesses
	 */
	onPaginate(e) {
		this.props.bizActions.loadUserBusinesses(e.currentTarget.dataset.id);
	}

	/**
	 * clear form data on modal close
	 */
	onclose() {
		this.props.createBiz.onclose();
	}

	/**
 * delete business
 */
	onDelete(e) {
		e.preventDefault();
		if (window.confirm('Do you really want to delete this business?')) {
			this.props.bizActions.deleteUserBusinesses(e.currentTarget.dataset.id);
		}
	}

	/**
	 * load single business data and redirect to profile page
	 * @param {*} e event
	 */
	onView(e) {
		e.preventDefault();
		this.props.history.push(`/business/profile/${e.currentTarget.dataset.id}`);
		this.props.profileAction.loadBusinessReviews(e.currentTarget.dataset.id);
	}

	/**
	 * Fetch business for edit
	 * @param {*} e event
	 */
	onEdit(e) {
		e.preventDefault();
		this.props.createBiz.fetchBusiness(e.currentTarget.dataset.id);
		this.props.createBiz.inputChange({ prop: 'edit', value: true });
	}

	/**
	* save business on form save
	*/
	handleSubmit(event) {
		event.preventDefault();
		const {
			name, location, category, description, logo, id, edit,
		} = this.props.newBusiness;
		// check if its a new business or existing,
		// then use the id to differentiate between update and create
		edit
			? this.props.createBiz.registerBusiness({
				name, location, category, description, logo, id,
			})
			:	this.props.createBiz.registerBusiness({
				name, location, category, description, logo,
			});
		document.getElementById('hidePopUpBtn').click(); // close modal
	}

	/**
	 * allows user to drop images for upload
	 * @param {*} files files to upload
	 */
	handleDrop(files) {
		files.map((file) => {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('upload_preset', 'vzfp2ere');
			formData.append('api_key', 'Qjd1aIFSFzTBkcT8Jm5ooozuckc');
			formData.append('timestamp', (Date.now() / 1000) | 0);
			// Make an AJAX upload request using Axios
			this.props.createBiz.inputChange({ prop: 'uploading', value: true });
			return axios.post('https://api.cloudinary.com/v1_1/dzmdvppit/image/upload', formData, {
				headers: { 'X-Requested-With': 'XMLHttpRequest' },
			}).then((response) => {
				this.props.createBiz.inputChange({ prop: 'uploading', value: false });
				this.props.createBiz.inputChange({ prop: 'logo', value: response.data.public_id });
			});
		});
	}

	/**
	 * handles input change
	 * @param {*} e event
	 */
	handleChange(e) {
		this.props.createBiz.inputChange({ prop: e.target.name, value: e.target.value });
	}

	render() {
		const Loading = (
			<div className="loading">
				<img src="/img/spinner.gif" alt="loading" />
			</div>
		);
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
				<div className="container profile">
					<div className="card">
						<div className="card-body">
							<div className="row">
								<div className="col-sm-12"><h5>My Businesses</h5>

									<div className="table-responsive">

										<table className="table table-striped table-hover">
											<thead>
												<tr>
													<th colSpan="5">
														<a className="btn btn-success" href=".newBusinessModal" data-toggle="modal" data-target=".newBusinessModal">New Business</a>
													</th>
												</tr>
												<tr className="thead-dark">
													<th>Logo</th>
													<th>Name</th>
													<th>Location</th>
													<th>Category</th>
													<th>Actions</th>
												</tr>
											</thead>
											<tbody>
												{
													Object.keys(props.userBusinesses).length > 0
														? props.userBusinesses.loading
															? <tr><td colSpan="5">{Loading}</td></tr>
															:	(
																<ListTable
																	results={props.userBusinesses.businesses}
																	onView={this.onView}
																	onEdit={this.onEdit}
																	onDelete={this.onDelete}
																/>
															)
														:	<tr><td /></tr>
												}
											</tbody>
										</table>
									</div>
									{
										Object.keys(props.userBusinesses).length > 0
											? (
												<Pagination
													totalPages={props.userBusinesses.total_pages}
													onPaginate={this.onPaginate}
													page={props.userBusinesses.page}
												/>
											)
											:	''
									}
								</div>
							</div>
						</div>
					</div>
				</div>
				<BusinessForm
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					onclose={this.onclose}
					handleDrop={this.handleDrop}
					name={props.newBusiness.name}
					errors={props.newBusiness.errors}
					loading={props.newBusiness.loading}
					uploading={props.newBusiness.uploading}
					category={props.newBusiness.category}
					location={props.newBusiness.location}
					logo={props.newBusiness.logo}
					edit={props.newBusiness.edit}
					description={props.newBusiness.description}
				/>
			</div>
		);
	}
}

// validate props
myBusinesses.propType = {
	currentUser: PropTypes.object.isRequired,
	userLogin: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	profileAction: PropTypes.object.isRequired,
};

/**
 * maps state to props
 * @param {*} state redux
 */
function mapStateToProps(state) {
	const {
		currentUser, userBusinesses, newBusiness, userLogin,
	} = state;
	return {
		currentUser,
		userLogin,
		newBusiness,
		userBusinesses,
	};
}

/**
 * maps redux actions to props
 * @param {*} dispatch method to dispatch action
 */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(loginActions, dispatch),
		bizActions: bindActionCreators(bizActions, dispatch),
		createBiz: bindActionCreators(createAction, dispatch),
		profileAction: bindActionCreators(BusinessProfileActions, dispatch),
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(myBusinesses);
