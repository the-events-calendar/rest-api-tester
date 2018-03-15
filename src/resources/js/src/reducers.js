const redux = window.redux || require( 'redux' );
const combineReducers = redux.combineReducers;
const apis = require( './reducers/apis' );

const reducers = combineReducers( {
	apis,
} );

export default reducers;