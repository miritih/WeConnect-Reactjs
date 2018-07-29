import React from 'react';
import { Image } from 'cloudinary-react';
import { cloudName } from '../../utils/Config';

const BusinessItem = ({business, index}) => {
	return(
		<div key={index} className="col-sm-6 col-xs-12">
			<div className="card border-info">
				<div className="card-body">
					<div className="row">
						<div className="col-sm-6 col-xs-12">
							<Image cloudName={cloudName} publicId='download_qfbj36' width="195" crop="scale" />
						</div>
						<div className="col-sm-6 col-xs-12">
							<h5 className="card-title text-capitalize">{business.name}</h5>
							<p className="card-text">{business.description}</p>
							<p>Location: <span className="text-info">{business.location}</span><br/></p>
							<p>Category: <span className="text-info">{business.category}</span><br/></p>
							<a className="btn btn-info">View Profile</a>
						</div>
					</div>
				
				</div>
			</div>
		</div>
	);
};

export default BusinessItem;