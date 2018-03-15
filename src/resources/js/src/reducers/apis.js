import {API_CHANGE} from './actions';

module.exports = function( apis = [], action ) {
	if ( apis.length === 0 ) {
		return [];
	}


	switch ( action.type ) {
		case API_CHANGE:
			apis = apis.map( function( api ) {
				api.current = api.slug === action.current;

				return api;
			} );
			break;
		default:
			apis = apis.map( function( api, i ) {
				if ( 0 === i ) {
					api.current = true;
				} else {
					api.current = false;
				}

				return api;
			} );
			break;
	}

	return apis;
};

