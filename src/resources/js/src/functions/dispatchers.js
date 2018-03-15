const actions = require( './../reducers/actions' );

const changeApi = function( slug ) {
	return {type: actions.API_CHANGE, current: slug};
};

const changeRoute = function( namespace, route ) {
	return {type: actions.ROUTE_CHANGE, namespace: namespace, route: route};
};

module.exports = {
	changeApi,
	changeRoute,
};
