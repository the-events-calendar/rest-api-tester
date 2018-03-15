import {API_CHANGE, ROUTE_CHANGE} from './actions';

module.exports = function( routes = [], action ) {
	if ( routes.length === 0 ) {
		return [];
	}

	switch ( action.type ) {
		default:
		case API_CHANGE:
			// select the first route
			routes = routes.map( function( route, i ) {
				if ( 0 === i ) {
					route.current = true;
				} else {
					route.current = false;
				}
				return route;
			} );
			break;
		case ROUTE_CHANGE:
			routes = routes.map( function( route ) {
				route.current = route.path === action.route;
				return route;
			} );
			break;
	}

	return apis;
};
