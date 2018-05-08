import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Search from './Search';
import Nav from './common/nav';

class Home extends React.Component {
	render() {
		const props = this.props;
		return (
			<div className="jumbotron jumbotron-home">
				<Nav
					history={props.history}
					loggedIn={props.loggedIn}
					user={props.currentUser.user}
					location={props.location}
				/>
				<Search />
			</div>
		);
	}
}
Home.propType = {
	currentUser: PropTypes.object.isRequired,
	loggedIn: PropTypes.bool.isRequired
};
function mapStateToProps(state, ownState) {
	return {
		currentUser: state.activeUser,
		loggedIn: state.loggedIn
	};
}
export default connect(mapStateToProps)(Home);
