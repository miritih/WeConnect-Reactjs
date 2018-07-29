import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import Search from '../forms/SearchForm';
import NavBar from '../common/NavBar';
import BusinessList from '../businessComponents/businessList';
import * as loginActions from '../../actions/loginActions';
import * as bizActions from '../../actions/businessActions';

class Home extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			search: ''
		};
		this.onPaginate= this.onPaginate.bind(this);
		this.onSearch= this.onSearch.bind(this);
		this.onChange= this.onChange.bind(this);
	}
	onPaginate(e){
		this.props.bizActions.loadBusinesses(e.currentTarget.dataset.id);
	}
	onSearch(e){
		e.preventDefault();
		this.props.bizActions.loadBusinesses(1,this.state.search);
	}
	onChange(e){
		this.setState({
			search: e.target.value
		});
	}
	render() {
		const Loading =(
			<div className="container bsprofile">
				<h3 className="text-center text-success">Registered businesses</h3>
				<br/>
				<div className="row">
					<div className="loading">
						<img src='/img/spinner.gif' alt="loading"/>
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
				{ props.businesses.loading ? Loading :
					<BusinessList businesses={props.businesses} onPaginate={this.onPaginate} />  
				}
					
			</div>
		);
	}
}
Home.propType = {
	currentUser: PropTypes.object.isRequired,
	loggedIn: PropTypes.bool.isRequired,
	actions: PropTypes.object.isRequired
};
function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		businesses: state.businesses,
		isLoggedIn: state.userLogin.isLoggedIn
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(loginActions, dispatch),
		bizActions: bindActionCreators(bizActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
