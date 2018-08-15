import React from 'react';
import { Image } from 'cloudinary-react';
import { cloudName } from '../../utils/Config';

const Reviewtem = ({review, index}) => {
	return(
		<div className="container col-md-8 offset-md-2" key={index}>
			<hr/>
			<div className="reviews">
				<Image cloudName={cloudName} publicId='download_qfbj36' width="90" crop="scale" />
				<h5>review title</h5>
				<p>Review content</p>
			</div>
			
		</div>
	);
};

export default Reviewtem;

