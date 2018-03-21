const getApiRoutes = function( apis ) {
	const current = apis.filter( function( api ) {
		return true === api.current;
	}, apis );

	if ( 0 === current.length ) {
		return [];
	}

	return current[0].routes;
};

const getCurrentApiRoute = function( apis ) {
	const routes = getApiRoutes( apis );

	const current = routes.filter( function( route ) {
		return true === route.current;
	} );

	if ( 0 === current.length ) {
		return routes[0];
	}

	return current[0];
};

const setCurrentApi = function( apis, current ) {
	if ( ! current ) {
		const current = apis.filter( function( api ) {
			return true === api.current;
		} );

		if ( current.length === 0 ) {
			apis[0].current = true;
		}
	} else {
		apis = apis.map( function( api ) {
			api.current = api.slug === current;

			return api;
		} );
	}

	return apis;
};

const setCurrentRoute = function( apis, namespace, routePath ) {
	apis = apis.map( function( api ) {
		api.current = api.namespace === namespace;
		api.routes = api.routes.map( function( route ) {
			route.current = route.route === routePath && route.namespace === namespace;
			return route;
		} );

		return api;
	} );

	return apis;
};

const setCurrentUser = function( users = [], current = undefined ) {
	return users.map( function( user ) {
		user.current = user.ID === current;
		return user;
	} );
};

const getColorFromStatus = function( status ) {
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
	getApiRoutes,
	getCurrentApiRoute,
	setCurrentApi,
	setCurrentRoute,
	setCurrentUser,
	getColorFromStatus,
};