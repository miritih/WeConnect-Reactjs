import React from 'react';

export const Pagination = ({page,totalPages, onPaginate}) => {
	let pages =[];
	[...Array(totalPages+1).keys()].map(i => i!==0 ? pages.push(i) : i);
	return(	
		<nav aria-label="page float-right navigation ">	
			<ul className="pagination justify-content-end">		
				{
					pages.map(function(i){
						return(<li key={i} className={i===page? 'page-item active' : 'page-item' }>
							<a data-id={i} onClick={onPaginate} className="page-link">{i}</a>
						</li>);
					})
				}
			</ul>
		</nav>
	);
};