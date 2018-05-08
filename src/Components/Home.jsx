import React from 'react';
// import $ from 'jquery'
import Search from './Search';
import Nav from './common/nav';

class Home extends React.Component {
	render() {
		const loggedIn = false;
		return (
			<div className="jumbotron jumbotron-home">
				<Nav
					loggedIn={loggedIn}
					history={this.props.history}
					location={this.props.location}
				/>
				<Search />
			</div>
		);
	}
}

export default Home;
