import React from 'react';
import { PropTypes } from 'prop-types';
import { Image } from 'cloudinary-react';
import Dropzone from 'react-dropzone';
import { cloudName } from '../../utils/Config';
import InputField from '../inputs/InputField';
import TextArea from '../inputs/textArea';
import Button from '../inputs/Button';
/**
 * register business form
 * @param {*} handleChange - handles change in inputs
 * @param {*} handleSubmit - handles form submit
 * @param {*} handleDrop - handles dropping images for upload
 * @param {*} onclose  - handles modal close
 * @param {*} uploading - checks if file is uploading
 * @param {*} loading - checks if changes are loading
 * @param {*} errors - contains all the errors
 * @param {*} edit - handles edit
 * @param {*} name - name of the business
 * @param {*} category - business category
 * @param {*} location - business location
 * @param {*} logo - business log
 * @param {*} description - business description
 */
const BusinessForm = ({
	handleChange,
	handleSubmit,
	handleDrop,
	onclose,
	uploading,
	loading,
	errors,
	edit,
	name, category, location, logo, description,
}) => {
	return (
		<div>
			<div className="container">
				<section className="bsprofile">
					<div
						className="modal fade newBusinessModal"
						id="BusinessModal"
						tabIndex="-1"
						data-keyboard="false"
						data-focus="true"
						role="dialog"
						aria-labelledby="myLargeModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog modal-lg">
							<div className="modal-content">
								<div className="card  w-100">
									<div className="card-header">
										<button type="button" className="close" id="hidePopUpBtn" onClick={onclose} data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
										<h5>{edit ? 'Edit business' : 'Register business'}</h5>
									</div>
									<div className="card-body">
										<form className="form" onSubmit={handleSubmit}>
											<div className="row">
												<div className="col-md-8 col-sm-12">
													<InputField
														type="text"
														name="name"
														label="Name"
														onChange={handleChange}
														placeholder=""
														value={name}
														error={errors.name}
													/>
													<InputField
														type="text"
														name="category"
														label=" Category"
														onChange={handleChange}
														placeholder=""
														value={category}
														error={errors.category}
													/>
													<InputField
														type="text"
														name="location"
														label=" Location"
														onChange={handleChange}
														placeholder=""
														value={location}
														error={errors.location}
													/>
													<TextArea
														name="description"
														label="Description"
														onChange={handleChange}
														rows="10"
														value={description}
														error={errors.description}
													/>
												</div>
												<div className="col-md-4 col-sm-12">
													<p>Business Logo</p>
													<Dropzone
														onDrop={handleDrop}
														multiple={false}
														accept="image/*"
													>
														<Image cloudName={cloudName} publicId={logo} width="195" crop="scale" />
													</Dropzone>
													{errors.logo && <small className="text-danger">{errors.logo}</small>}
													<i className="fa hand-point-up">{ uploading ? 'Uploading.......' : 'Click or drop an image to upload'}</i>
													<br />
												</div>
											</div>
											<br />
											<Button
												type="submit"
												className="btn btn-primary"
												disabled={uploading | loading ? 'disabled' : null}
												text={uploading | loading ? 'saving....' : 'Save changes'}
											/>
											<button type="button" onClick={onclose} className="btn btn-secondary float-sm-right" data-dismiss="modal">Close</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

// validate props
BusinessForm.propTypes = {
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleDrop: PropTypes.func.isRequired,
	name: PropTypes.string,
	category: PropTypes.string,
	location: PropTypes.string,
	logo: PropTypes.string,
};
// define default props
BusinessForm.defaultProps = {
	name: '',
	category: '',
	location: '',
	logo: '',
};
export default BusinessForm;
