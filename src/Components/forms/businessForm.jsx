import React from 'react';
import { PropTypes } from 'prop-types';
import { Image } from 'cloudinary-react';
import Dropzone from 'react-dropzone';
import { cloudName } from '../../utils/Config';
import InputField from '../inputs/InputField';
import Button from '../inputs/Button';

const BusinessForm = ({ 
	handleChange, 
	handleSubmit,
	uploading,
	modal,
	name, category, location, description
}) => {
	return (
		<div> 
			<div className="container">
				<section className="bsprofile">
					<div className={modal? 'modal fade newBusinessModal' :''} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
						<div className="modal-dialog modal-lg">
							<div className="modal-content">
							
								<div className="card  w-100">
									<div className="card-header">
										<h5>Register business</h5>
									</div>
									<div className="card-body">
										<form className="form" onSubmit={handleSubmit}>
											<div className="row">
												<div className="col-md-8 col-sm-12">
													<InputField
														type='text'
														name='bs_name'
														label=' Name'
														onChange={handleChange}
														placeholder=''
														value={name}
														// error={errors['first_name']}
													/>
													<InputField
														type='text'
														name='bs_category'
														label=' Category'
														onChange={handleChange}
														placeholder=''
														value={category}
														// error={errors['first_name']}
													/>
													<InputField
														type='text'
														name='bs_location'
														label=' Location'
														onChange={handleChange}
														placeholder=''
														value={location}
														// error={errors['first_name']}
													/>
													<div className='form-group'>
														<label htmlFor="description">Description</label>
														<textarea 
															className="form-control"
															value={description}
															rows="10"
															onChange={handleChange}
															name="description"></textarea>
													</div>
												</div>
												<div className="col-md-4 col-sm-12">
													<p>Business Logo</p> 
													<Dropzone
														// onDrop={handleDrop}
														multiple={false}
														accept="image/*">
														<Image cloudName={cloudName} publicId="download" width="200" crop="scale" />
													</Dropzone>
													<i className="fa hand-point-up">{ uploading ? 'Uploading.......' : 'Click or drop an image to upload'}</i>
													<br />
												</div>
											</div>
											<br/>
											<Button
												type="submit"
												className="btn btn-primary"
												text='Save Changes'
											/>
										
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
BusinessForm.propTypes = {
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleDrop: PropTypes.func.isRequired,
	name: PropTypes.string,
	category: PropTypes.string,
	location: PropTypes.string,
	Image: PropTypes.string
};
export default BusinessForm;
