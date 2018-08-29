import React from 'react';
import { Pagination } from '../../utils/paginate';

import Item from './businessItem';
/**
 * presentations component to display business items
 * @param {*} businesses - single business details
 * @param {*} onView - function to to fetch single business the redirect to profile
 * @param {*} onPaginate - function to generate pagination
 */
const ListBusinesses = ({ businesses, onView, onPaginate }) => {
	return (

		<div className="container bg-white bsprofile">
			<br />
			<h3 className="text-center text-success">Registered Businesses</h3>
			<br />
			<div className="row">
				{
					(businesses.businesses).length >= 1 // check if there any businesses
						? businesses.businesses.map((business, i) => {
							return <Item business={business} onView={onView} key={i} />;
						})
						:	<div className="alert  text-center col-md-12 alert-info">No results found</div>
				}
			</div>
			{/*
			load pagination
			*/}
			<Pagination
				totalPages={businesses.total_pages}
				onPaginate={onPaginate}
				page={businesses.page}
			/>
		</div>
	);
};
ListBusinesses.propTypes = {

};
export default ListBusinesses;
