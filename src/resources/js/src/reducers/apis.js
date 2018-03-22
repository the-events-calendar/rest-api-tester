import {API_CHANGE, METHOD_CHANGE, ROUTE_CHANGE} from './actions';

const currentApi = function( apis = [], currentApi, action ) {
	if ( apis.length === 0 ) {
		return undefined;
	}

	let current;

	switch ( action.type ) {
		case API_CHANGE:
			current = apis.reduce( function( acc, api ) {
				acc = action.current === api.slug ? api : acc;

				return acc;
			}, apis[0] );
			break;
		case ROUTE_CHANGE:
		case METHOD_CHANGE:
			current = undefined !== currentApi ? currentApi : apis[0];
			break;
		default:
			current = apis[0];
			break;
	}

	return current;
};

const currentRoute = function( routes = [], currentRoute, action ) {
	if ( ! routes || 0 === routes.length ) {
		return {};
	}

	let current;

	switch ( action.type ) {
		case ROUTE_CHANGE:
			current = routes.reduce( function( acc, route ) {
				acc = action.current === route.route ? route : acc;

				return acc;
			}, routes[0] );
			break;
		case API_CHANGE:
		case METHOD_CHANGE:
			current = undefined !== currentRoute ? currentRoute : routes[0];
			break;
		default:
			current = routes[0];
			break;
	}

	return current;
};

const currentMethod = function( methods = [], currentMethod, action ) {
	if ( ! methods || 0 === methods.length ) {
		return [];
	}

	let current;

	switch ( action.type ) {
		case API_CHANGE:
		case ROUTE_CHANGE:
			current = methods[0];
		case METHOD_CHANGE:
			current = methods.reduce( function( acc, method ) {
				acc = action.current === method.slug ? method : acc;
				return acc;
			}, methods[0] );
			break;
		default:
			current = undefined !== currentMethod ? currentMethod : methods[0];
			break;
	}

	return current;
};

module.exports = function( oldApis = {}, action ) {
	if ( oldApis.length === 0 ) {
		return {};
	}

	const apis = {...oldApis};

	apis.current = currentApi( apis.all, apis.current, action );

	if ( ! apis.current ) {
		return apis;
	}

	apis.routes = apis.current.routes;
	apis.currentRoute = currentRoute( apis.routes, apis.currentRoute, action );
	apis.methods = apis.currentRoute.methods;
	apis.currentMethod = currentMethod( apis.methods, apis.currentMethod, action );
	apis.args = apis.currentMethod.args;
	apis.all;

	return apis;
};

