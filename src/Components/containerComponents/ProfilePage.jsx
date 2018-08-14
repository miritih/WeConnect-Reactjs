import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import NavBar from '../common/NavBar';
import ProfileNav from '../common/ProfileNav';
import ProfileUpdate from '../forms/ProfileUpdate';
import * as userActions from '../../actions/UserAction';
import * as loginActions from '../../actions/loginActions';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
	}
	handleChange(e) {
		this.props.actions.inputChange({prop: e.target.name, value: e.target.value});
	}

	handleDrop(file) {
		// Initial FormData
		file.map(file => {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('upload_preset', 'vzfp2ere');
			formData.append('api_key', 'Qjd1aIFSFzTBkcT8Jm5ooozuckc');
			formData.append('timestamp', (Date.now() / 1000) | 0);
			// Make an AJAX upload request using Axios
			this.props.actions.inputChange({prop: 'uploading', value: true});
			return axios.post('https://api.cloudinary.com/v1_1/dzmdvppit/image/upload', formData, {
				headers: { 'X-Requested-With': 'XMLHttpRequest' },
			}).then(response => {
				this.props.actions.inputChange({prop: 'uploading', value: false});
				this.props.actions.inputChange({prop: 'image', value: response.data.public_id});
			});
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const {email, username, first_name, last_name, image } = this.props.currentUser;
		this.props.actions.updateUser({
			email, 
			username,
			first_name,
			last_name,
			image
		});
	}
	componentDidUpdate(){
		if (this.props.currentUser.change) {
			window.onbeforeunload = () => true;
		} else {
			window.onbeforeunload = undefined;
		}
	}
	render() {
		const props = this.props; 
		const user = props.currentUser;
		return (
			<div>
				<NavBar
					history={props.history}
					loggedIn={props.userLogin.isLoggedIn}
					user={user}
					location={props.location}
					actions={props.loginAction}
				/>
				<div className="container profile">
					<div className="card">
						<div className="card-body">
							<div className="row">
								<div className="col-sm-3">
									<ProfileNav 
										history={props.history}
									/>
								</div>
								<div className="col-sm-9"><h5>Edit Profile</h5>
									<hr />
									<ProfileUpdate 
										handleChange={this.handleChange}
										handleDrop={this.handleDrop}
										handleSubmit={this.handleSubmit}
										email={user.email}
										change={user.change}
										image={user.image}
										loading={user.loading}
										uploading={user.uploading}
										username={user.username}
										first_name={user.first_name}
										last_name={user.last_name}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
Profile.propType = {
	currentUser: PropTypes.object.isRequired,
	userLogin: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};
function mapStateToProps(state) {
	const {
		currentUser,
		userLogin,
	} = state;
	return {
		currentUser,
		userLogin,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(userActions, dispatch),
		loginAction: bindActionCreators(loginActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
