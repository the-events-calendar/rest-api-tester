const actions = require( './../reducers/actions' );

const changeApi = function( slug ) {
	return {type: actions.API_CHANGE, current: slug};
};

const changeRoute = function( route ) {
	return {type: actions.ROUTE_CHANGE, current: route};
};

const changeUser = function( ID ) {
	return {type: actions.USER_CHANGE, current: ID};
};

const changeMethod = function( method ) {
	return {type: actions.METHOD_CHANGE, current: method};
};

const submitRequest = function() {
	return {type: actions.LOADING};
};

const changeResponse = function( response ) {
	return {type: actions.RESPONSE_CHANGE, status: response.status, responseText: response.responseText};
};

module.exports = {
	changeApi,
	changeRoute,
	changeUser,
	changeMethod,
	submitRequest,
	changeResponse,
};
