import React from 'react';

const BusinessItem = ({results}) => {
	return(
		results.length >= 1  ?
			results.map(function(business, i){
				return (
					<tr key={i}>
						<td>{business.name}</td>
						<td>{business.location}</td>
						<td>{business.category}</td>
						<td>
							<a className="link" href="">
								<i className="fa fa-eye fa-1x"></i>
							</a>
							<a className="link" href="">
								<i className="fa fa-edit fa-1x"></i>
							</a>
							<a className="link" href="">
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