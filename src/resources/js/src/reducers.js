const redux = window.redux || require( 'redux' );
const combineReducers = redux.combineReducers;
const apis = require('./reducers/apis');
const routes = require('./reducers/routes');

const reducers = combineReducers( {
	apis,
	routes,
} );

export default reducers;