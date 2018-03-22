const titleize = function( slug ) {
	return slug.replace( /[-_]/g, ' ' ).replace( /\b[a-z]/g, function() {
		return arguments[0].toUpperCase();
	} );
};

const statusToColor = function( status ) {
	if ( ! status ) {
		return '';
	}

	let color = 'green';

	if ( status >= 300 && status < 400 ) {
		// redirection
		color = 'orange';
	} else if ( status >= 400 && status < 500 ) {
		// bad request
		color = 'red';
	} else if ( status >= 500 ) {
		// internal error
		color = 'white';
	}

	return color;
};


module.exports = {
	titleize,
	statusToColor,
};