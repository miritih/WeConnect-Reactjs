import React from 'react';
import PropTypes from 'prop-types';

export const Pagination = ({ page, totalPages, onPaginate }) => {
	const pages = [];
	[...Array(totalPages + 1).keys()].map(i => (i !== 0 ? pages.push(i) : i));
	return (
		<nav aria-label="page float-right navigation ">
			<ul className="pagination justify-content-end">
				{
					pages.map((i) => {
						return (
							<li key={i} className={i === page ? 'page-item active' : 'page-item'}>
								<button data-id={i} onClick={onPaginate} className="page-link">{i}</button>
							</li>
						);
					})
				}
			</ul>
		</nav>
	);
};
Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	onPaginate: PropTypes.func.isRequired,
};
