const actions = require( './../reducers/actions' );

const changeApi = function( slug ) {
	return {type: actions.API_CHANGE, current: slug};
};

const changeRoute = function( namespace, route ) {
	return {type: actions.ROUTE_CHANGE, namespace: namespace, route: route};
};

const changeUser = function( ID ) {
	return {type: actions.USER_CHANGE, ID: ID};
};

module.exports = {
	changeApi,
	changeRoute,
	changeUser,
};
