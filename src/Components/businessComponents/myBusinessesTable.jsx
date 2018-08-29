import React from 'react';
import { Image } from 'cloudinary-react';
import { cloudName } from '../../utils/Config';
/**
 * presentations component to display business items
 * @param {*} results - all businesses to display
 * @param {*} onView - function to to fetch single business the redirect to profile
 * @param {*} onEdit - function to edit business
 * @param {*} onDelete - function to delete business
 */
const BusinessItem = ({
	results, onView, onEdit, onDelete,
}) => {
	return (
		results.length >= 1 // check if business are present else print no businesses
			? results.map((business, i) => {
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
								<i className="fa fa-eye fa-1x" />
							</a>
							<a
								className="link"
								title="Edit Business"
								data-id={business.id}
								data-toggle="modal"
								data-target=".newBusinessModal"
								onClick={onEdit}
								href=""
							>
								<i className="fa fa-edit fa-1x" />
							</a>
							<a className="link" title="Delete Business" data-id={business.id} onClick={onDelete} href="">
								<i className="fa fa-times fa-1x" />
							</a>
						</td>
					</tr>
				);
			})
			: (
				<tr>
					<td colSpan="5">
						<div className="alert  text-center alert-info">No results found</div>
					</td>
				</tr>
			));
};

export default BusinessItem;
