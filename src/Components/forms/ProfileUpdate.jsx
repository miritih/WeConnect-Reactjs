import React from 'react';
import { PropTypes } from 'prop-types';
import { Image } from 'cloudinary-react';
import Dropzone from 'react-dropzone';
import { cloudName } from '../../utils/Config';
import Button from '../inputs/Button';
import InputField from '../inputs/InputField';

const ProfileUpdate = ({
	handleChange, handleSubmit, email, uploading, loading, handleDrop,
	username, first_name, change, last_name, image,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className="row">
				<div className="col-md-8 col-sm-12">
					<InputField
						type="text"
						disabled="disabled"
						value={username}
						name="username"
						label="Username"
						onChange={handleChange}
					/>
					<InputField
						type="email"
						disabled="disabled"
						value={email}
						name="email"
						label="Email"
						onChange={handleChange}
					/>
					<InputField
						type="text"
						value={first_name}
						disabled={uploading ? 'disabled' : null}
						name="first_name"
						label="First Name"
						required="required"
						onChange={handleChange}
					/>
					<InputField
						type="text"
						value={last_name}
						disabled={uploading ? 'disabled' : null}
						name="last_name"
						label="Last Name"
						required="required"
						onChange={handleChange}
					/>
				</div>
				<div className="col-md-4 col-sm-12">
					<p>Profile Picture</p>
					<Dropzone
						onDrop={handleDrop}
						multiple={false}
						accept="image/*"
					>
						<Image cloudName={cloudName} publicId={image} width="195" crop="scale" />
					</Dropzone>
					<i className="fa hand-point-up">{ uploading ? 'Uploading.......' : 'Click or drop an image here'}</i>
					<br />
				</div>
			</div>
			<Button
				type="submit"
				className="btn btn-primary"
				disabled={uploading | loading ? 'disabled' : null}
				text={uploading | loading ? 'Loading....' : 'Save changes'}
			/>
			{change
				? <p className="text-info">You have unsaved changes</p> : ''
			}
		</form>
	);
};
ProfileUpdate.propTypes = {
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	email: PropTypes.string.isRequired,
	uploading: PropTypes.bool,
	loading: PropTypes.bool,
	handleDrop: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	first_name: PropTypes.string.isRequired,
	change: PropTypes.bool,
	last_name: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
};

ProfileUpdate.defaultProps = {
	uploading: false,
	loading: false,
	change: false,
};

export default ProfileUpdate;
