import React from 'react';
import { Image } from 'cloudinary-react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { cloudName, baseURL } from '../../utils/Config';
import { toast } from 'react-toastify';
import Authservice from '../Auth/AuthService';

class ProfileUpdate extends React.Component {
	constructor() {
		super();

		this.Auth = new Authservice();
		this.state = {
			username: '',
			first_name: '',
			last_name: '',
			current_user: '',
			email: '',
			image: '',
			change: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpload = this.handleDrop.bind(this);
	}
	handleChange(e) {
		this.setState({
			change: true,
			[e.target.name]: e.target.value
		});
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
			console.log(file);
			return axios.post('https://api.cloudinary.com/v1_1/dzmdvppit/image/upload', formData, {
				headers: { 'X-Requested-With': 'XMLHttpRequest' },
			}).then(response => {
				console.log(response.data);
				this.setState({
					change: true,
					image: response.data.public_id
				});
			});
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const user = {
			username: this.state.username,
			email: this.state.email,
			image: this.state.image,
			first_name: this.state.first_name,
			last_name: this.state.last_name
		};
		axios({
			method: 'put',
			url: 'auth/update-profile',
			data: user,
			baseURL: baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
				'access-token': this.Auth.getToken()
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				this.setState({
					change: false
				});
				toast.success(({ closeToast }) => <div>
					<h3>Success</h3>
					<p>Your Profile was successfull updated<br />
					</p>
				</div>);
			}
		});
	}
	componentWillMount() {
		this.setState({
			current_user: this.Auth.getUser()['user'],
		});
	}
	componentDidMount() {
		const { first_name, username, last_name, email, image } = this.state.current_user;
		this.setState({
			username: username,
			first_name: first_name,
			last_name: last_name,
			email: email,
			image: image
		});
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="row">
					<div className="col-md-8 col-sm-12">
						<label htmlFor="username" >Username</label>
						<input
							type="text"
							disabled
							value={this.state.username}
							className="form-control"
							name="username"
							onChange={this.handleChange} />
						<br />
						<label htmlFor="email">Email</label>
						<input
							type="text"
							disabled
							className="form-control "
							name="email"
							value={this.state.email}
							onChange={this.handleChange}
						/>
						<br />
						<label htmlFor="first_name">First Name</label>
						<input
							type="text"
							required
							className="form-control "
							name="first_name"
							value={this.state.first_name}
							onChange={this.handleChange}
						/>
						<br />
						<label htmlFor="last_name">Last Name</label>
						<input
							type="text"
							className="form-control "
							name="last_name"
							required
							value={this.state.last_name}
							onChange={this.handleChange}
						/>
						<br />
					</div>
					<div className="col-md-4 col-sm-12">
						<p>Profile Picture</p>
						<Dropzone
							onDrop={this.handleDrop}
							multiple={false}
							accept="image/*">
							<Image cloudName={cloudName} publicId={this.state.image} width="195" crop="scale" />
						</Dropzone>
						<i className="fa hand-point-up">Click or drop an image here</i>
						<br />
					</div>
				</div>
				<button type="submit" className="btn btn-primary">
					Save changes
				</button>
				{this.state.change ?
					<p className="text-info">You have unsaved changes</p> : ''
				}
			</form>
		);
	}
}

export default ProfileUpdate;
