const actions = require( './../reducers/actions' );

const changeApi = function( slug ) {
	return {type: actions.API_CHANGE, current: slug};
};

const changeRoute = function( route ) {
	return {type: actions.ROUTE_CHANGE, current: route};
};

const changeUser = function( ID ) {
	return {type: actions.USER_CHANGE, ID: ID};
};

const changeMethod = function( method ) {
	return {type: actions.METHOD_CHANGE, current: method};
};

module.exports = {
	changeApi,
	changeRoute,
	changeUser,
	changeMethod,
};
