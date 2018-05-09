import React from 'react';
class SearchForm extends React.Component {
	render() {
		return (
			<div className="row">
				<div className="col-md-1 col-sm-12 col-xm-12"></div>
				<div className="col-md-10 col-sm-12 col-xm-12">
					<div className="card">
						<div className="card-header">
							<h5 className="card-title text-center">Find and connect to a businesses</h5>
						</div>
						<div className="card-body">
							<form className="form-inline">
								<label className="sr-only">Business Name</label>
								<input type="text" className="form-control ml-auto" placeholder="Search by name" name="bsname" />
								<label className="sr-only">Location</label>
								<input type="text" className="form-control ml-auto" placeholder="Search by Location" name="location" />
								<label className="sr-only">Category</label>
								<input type="text" className="form-control ml-auto" placeholder="Search by Catogory" name="category" />
								<button className="btn btn-success ml-auto">Search</button>
							</form>
						</div>
					</div>
				</div>
				<div className="col-md-1 col-sm-12 col-xm-12"></div>
			</div>
		);
	}
}

export default SearchForm;
