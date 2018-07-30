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

export class myBusinesses extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onPaginate = this.onPaginate.bind(this);
	}
	handleChange(e) {
		console.log({prop: e.target.name, value: e.target.value});
	}
	onPaginate(e){
		this.props.bizActions.loadUserBusinesses(e.currentTarget.dataset.id);
	}
	handleSubmit(e) {
		e.preventDefault();
		console.log(e);
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
															<ListTable results ={props.userBusinesses.businesses} /> 
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
