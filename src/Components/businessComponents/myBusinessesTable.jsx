import React from 'react';
import { Image } from 'cloudinary-react';
import { cloudName } from '../../utils/Config';

const BusinessItem = ({results, onView, onEdit, onDelete}) => {
	return(
		results.length >= 1  ?
			results.map(function(business, i){
				return (
					<tr key={i}>
						<td>
							<Image cloudName={cloudName} publicId={business.logo} alt="Logo" width="20" crop="scale" />
						</td>
						<td>{business.name}</td>
						<td>{business.location}</td>
						<td>{business.category}</td>
						<td>
							<a className="link" title="View Business" data-id={business.id} onClick={onView} href="">
								<i className="fa fa-eye fa-1x"></i>
							</a>
							<a className="link" title="Edit Business"
								data-id={business.id}
								data-toggle="modal" 
								data-target=".newBusinessModal" 
								onClick={onEdit} href="">
								<i className="fa fa-edit fa-1x"></i>
							</a>
							<a className="link" title="Delete Business" data-id={business.id} onClick={onDelete} href="">
								<i className="fa fa-times fa-1x"></i>
							</a>
						</td>
					</tr>
				);
			}) 
			:
			<tr>
				<td colSpan="4">
					<div className="alert  text-center alert-info">No results found</div>
				</td>
			</tr>
	);
};

export default BusinessItem;