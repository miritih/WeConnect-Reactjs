import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
// import components 
import NavBar from '../common/NavBar';
import ProfileNav from '../common/ProfileNav';
import * as loginActions from '../../actions/loginActions';
import * as bizActions from '../../actions/userBusinessAction';
import { Pagination } from '../../utils/paginate';
import ListTable from '../businessComponents/myBusinessesTable';
import BusinessForm from '../forms/businessForm';

export class myBusinesses extends Component {
	constructor(props) {
		super(props);
		this.onPaginate = this.onPaginate.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onView = this.onView.bind(this);
	}

	handleChange(e) {
		this.actions.inputChange({prop: e.target.name, value: e.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
	}

	handleDrop(file){
		console.log(file);
	}

	onDelete(e){
		e.preventDefault();
		if (window.confirm('Do you really want to delete this business?')) { 
			this.props.bizActions.deleteUserBusinesses(e.currentTarget.dataset.id);
		}
	}

	onView(e){
		e.preventDefault();
	}
	onEdit(e){
		e.preventDefault();
	}

	onPaginate(e){
		this.props.bizActions.loadUserBusinesses(e.currentTarget.dataset.id);
	}
	componentDidMount(){
		this.props.bizActions.loadUserBusinesses();
	}
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
				<div className="container profile">
					<div className="card">
						<div className="card-body">
							<div className="row">
								<div className="col-sm-3">
									<ProfileNav />
								</div>
								<div className="col-sm-9"><h5>My Businesses</h5>
									<hr />
									<div className="table-responsive">
										
										<table className="table table-striped table-hover">
											<thead>
												<tr>
													<th colSpan="4">
														<a className="btn btn-success" data-toggle="modal" data-target=".newBusinessModal">New Business</a>
													</th>
												</tr>
											</thead>
											<thead className="thead-dark">
												<tr>
													<th>Name</th>
													<th>Location</th>
													<th>Category</th>
													<th>Actions</th>
												</tr>
											</thead>
											<tbody>
												{ 
													Object.keys(props.userBusinesses).length > 0?
														props.userBusinesses.loading ? 
															<tr><td colSpan="4">'Loading.....'</td></tr>
															:
															<ListTable 
																results ={props.userBusinesses.businesses}
																onView={this.onView}
																onEdit={this.onEdit}
																onDelete={this.onDelete}
															/> 
														: 
														<tr><td></td></tr>
												}
											</tbody>
										</table>
									</div>
									{
										Object.keys(props.userBusinesses).length > 0?
											<Pagination 
												totalPages={props.userBusinesses.total_pages}
												onPaginate={this.onPaginate}
												page={props.userBusinesses.page}
												
											/>
											:
											''
									}
								</div>
							</div>
						</div>
					</div>
				</div>
				<BusinessForm
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					handleDrop={this.handleDrop}
					modal={true}
				/>
			</div>
		);
	}
}
myBusinesses.propType = {
	currentUser: PropTypes.object.isRequired,
	userLogin: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	const {currentUser, userBusinesses, userLogin} = state;
	return {
		currentUser,
		userLogin,
		userBusinesses
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(loginActions, dispatch),
		bizActions: bindActionCreators(bizActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(myBusinesses);
