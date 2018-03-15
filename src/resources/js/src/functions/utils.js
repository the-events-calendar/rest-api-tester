const titleize = function( slug ) {
	return slug.replace( /[-_]/g, ' ' ).replace( /\b[a-z]/g, function() {
		return arguments[0].toUpperCase();
	} );
};

module.exports = {
	titleize,
};