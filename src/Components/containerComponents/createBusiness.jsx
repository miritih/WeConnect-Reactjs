import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import BusinessForm from '../forms/businessForm';
import NavBar from '../common/NavBar';
import * as RegisterUserActions from '../../actions/registerUserAction';
import * as loginActions from '../../actions/loginActions';

class CreateBusiness extends React.Component {
	constructor(props) {
		super(props);
		this.actions = 	this.props.actions;
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
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
	render() {
		const props = this.props;
		return (
			<div>
				<NavBar
					history={props.history}
					loggedIn={props.userLogin.isLoggedIn}
					user={props.currentUser}
					location={props.location}
					actions={props.actionsLogin}
				/>
				<div className="jumbotron">
				</div>
				<BusinessForm
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					handleDrop={this.handleDrop}
				/>
			</div>
		);
	}
}

CreateBusiness.propType = {
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
		actionsLogin: bindActionCreators(loginActions, dispatch),
		actions: bindActionCreators(RegisterUserActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateBusiness);
