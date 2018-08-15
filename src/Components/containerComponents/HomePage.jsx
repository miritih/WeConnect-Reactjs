import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import Search from '../forms/SearchForm';
import NavBar from '../common/NavBar';
import * as loginActions from '../../actions/loginActions';

class Home extends React.Component {
	render() {
		const props = this.props;
		return (
			<div className="jumbotron jumbotron-home">
				<NavBar
					history={props.history}
					loggedIn={props.isLoggedIn}
					user={props.currentUser}
					location={props.location}
					actions={props.actions}
				/>
				<Search />
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
		isLoggedIn: state.userLogin.isLoggedIn
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(loginActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);