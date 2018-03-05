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
	if(apis.length === 0){
		return [];
	}

	// select none
	apis = apis.map( function( api ) {
		api.selected = false;
		return api;
	} );

	switch ( action.type ) {
		case API_CHANGE:
			apis = apis.map( function( api ) {
				api.selected = api.slug === action.selected;

				return api;
			} );
		default:
			apis[0].selected = true;
	}

	return apis;
}

const reducers = combineReducers( {
	apis,
} );

export default reducers;