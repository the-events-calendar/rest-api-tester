const setCurrentUser = function( users = [], current = undefined ) {
	if ( ! users || 0 === users.length ) {
		return [];
	}

	return users.map( function( user ) {
		user.current = current !== undefined ?
			current === user.ID
			: true === user.current;

		return user;
	} );
};

module.exports = {
	setCurrentUser,
};