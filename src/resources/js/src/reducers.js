const redux = window.redux || require( 'redux' );
const combineReducers = redux.combineReducers;

import {
	API_CHANGE,
	ENDPOINT_CHANGE,
	METHOD_CHANGE,
	RESPONSE_CHANGE,
	SAFE_REQUEST_CHANGE,
	SUBMIT_REQUEST,
	USER_CHANGE
} from './actions'

function apis( apis = [], action ) {
	if ( apis.length === 0 ) {
		return [];
	}

	// select none
	apis = apis.map( function( api ) {
		api.checked = false;
		return api;
	} );

	switch ( action.type ) {
		case API_CHANGE:
			apis = apis.map( function( api ) {
				api.checked = api.slug === action.checked;

				return api;
			} );
			break;
		default:
			apis[0].checked = true;
			break;
	}

	return apis;
}

const reducers = combineReducers( {
	apis,
} );

export default reducers;