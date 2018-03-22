const redux = window.redux || require( 'redux' );
const combineReducers = redux.combineReducers;
const apis = require( './reducers/apis' );
const users = require( './reducers/users' );
const response = require( './reducers/response' );

const reducers = combineReducers( {
	apis,
	users,
	response,
} );

export default reducers;