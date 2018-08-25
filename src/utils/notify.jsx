import React from 'react';
import { toast } from 'react-toastify';

export function notify(type, title, message) {
	const body = (
		<div>
			<h3>{title}</h3>
			<p> {message} </p>
		</div>
	);
	switch (type) {
	case 'success':
		return toast.success(() => body);
	case 'error':
		return toast.error(() => body);
	default:
		return toast(() => body);
	}
}
