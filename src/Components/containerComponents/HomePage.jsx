import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import Search from '../forms/SearchForm';
import NavBar from '../common/NavBar';
import BusinessList from '../businessComponents/businessList';
import * as loginActions from '../../actions/loginActions';
import * as bizActions from '../../actions/businessActions';
import * as BusinessProfileActions from '../../actions/businessProfileAction';


class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
		};
		this.onPaginate = this.onPaginate.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onView = this.onView.bind(this);
	}

	onPaginate(e) {
		// this methods dispaches businesses with the pagination set
		// the methods sets the pagination page
		this.props.bizActions.loadBusinesses(e.currentTarget.dataset.id);
	}

	onSearch(e) {
		// this methods allows the serch functionality on businesses,
		// it loads all businesses that match the search creteria
		e.preventDefault();
		this.props.bizActions.loadBusinesses(1, this.state.search);
	}

	onChange(e) {
		// sets the input value. this also allows typing in the input
		this.setState({
			search: e.target.value,
		});
	}

	onView(e) {
		// loads a single buiness for viewing
		e.preventDefault();
		this.props.history.push(`/business/profile/${e.currentTarget.dataset.id}`);
		this.props.profileAction.loadBusinessReviews(e.currentTarget.dataset.id);
	}

	render() {
		const Loading = (
			<div className="container bsprofile">
				<h3 className="text-center text-success">Registered businesses</h3>
				<br />
				<div className="row">
					<div className="loading">
						<img src="/img/spinner.gif" alt="loading" />
						<i>loading ...</i>
					</div>
				</div>
			</div>
		);
		const props = this.props;
		return (
			<div>
				<div className="jumbotron jumbotron-home">
					<NavBar
						history={props.history}
						loggedIn={props.isLoggedIn}
						user={props.currentUser}
						location={props.location}
						actions={props.actions}
					/>
					<Search
						onSearch={this.onSearch}
						onChange={this.onChange}
						value={this.state.search}
					/>
				</div>
				{ props.businesses.loading ? Loading
					: (
						<BusinessList
							businesses={props.businesses}
							onView={this.onView}
							onPaginate={this.onPaginate}
						/>)
				}

			</div>
		);
	}
}
Home.propType = {
	currentUser: PropTypes.object.isRequired,
	loggedIn: PropTypes.bool.isRequired,
	actions: PropTypes.object.isRequired,
	profileAction: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		businesses: state.businesses,
		isLoggedIn: state.userLogin.isLoggedIn,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(loginActions, dispatch),
		bizActions: bindActionCreators(bizActions, dispatch),
		profileAction: bindActionCreators(BusinessProfileActions, dispatch),
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
