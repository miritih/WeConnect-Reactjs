import React from 'react';
import { Pagination } from '../../utils/paginate';

import Item from './businessItem';

const ListBusinesses = ({ businesses, onView, onPaginate }) => {
	return (

		<div className="container bg-white bsprofile">
			<br />
			<h3 className="text-center text-success">Registered Businesses</h3>
			<br />
			<div className="row">
				{
					(businesses.businesses).length >= 1
						? businesses.businesses.map((business, i) => {
							return <Item business={business} onView={onView} key={i} />;
						})
						:	<div className="alert  text-center col-md-12 alert-info">No results found</div>
				}
			</div>
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
