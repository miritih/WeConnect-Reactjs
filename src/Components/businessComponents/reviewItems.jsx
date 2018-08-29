import React from 'react';
/**
 * presentations component to display business items
 * @param {*} review - single review to display
 * @param {*} index - index identifier for the review
 */
const Reviewtem = ({ review, index }) => {
	return (
		<div className="container col-md-8 offset-md-2" key={index}>
			<hr />
			<div className="reviews">
				<h5>{review.title}</h5>
				<p>{review.body}</p>
			</div>

		</div>
	);
};

export default Reviewtem;
