import React from 'react';
import { Pagination } from '../../utils/paginate';

import Item from './businessItem';

const ListBusinesses = ({businesses, onPaginate}) => {
	return (

		<div className="container bsprofile">
			<br/>
			<h3 className="text-center text-success">Registered Businesses</h3>
			<br/>
			<div className="row">
				{
					(businesses.businesses).length >= 1 ?
						businesses.businesses.map(function(business, i){
							return <Item business ={business} key ={i}/>;
						}) 
						:
						<div className="alert  text-center col-md-12 alert-info">No results found</div>
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