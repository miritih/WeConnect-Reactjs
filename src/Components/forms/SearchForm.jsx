import React from 'react';
import { PropTypes } from 'prop-types';

export const SearchForm = ({onSearch, onChange, value}) => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12 col-sm-12 col-xm-12">
					<div className="card">
						<div className="card-header">
							<h5 className="card-title text-center">Search Businesses</h5>
						</div>
						<div className="card-body">
							<form onSubmit={onSearch} className="form-inline">
								<div className="input-group col-md-8 offset-md-2">
									<input 
										className="form-control form-control-lg" 
										type="search"
										onKeyUp={onSearch}
										value={value}
										onChange={onChange}
										placeholder="Filter by business name, category, or location" 
										id="example-search-input"
									/>
									<span className="input-group-append">
										<button className="btn btn-outline-info" type="submit">
											<i className="fa fa-search"></i>
										</button>
									</span>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
SearchForm.propTypes = {
	onSearch:PropTypes.func.isRequired, 
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
};
export default SearchForm;
