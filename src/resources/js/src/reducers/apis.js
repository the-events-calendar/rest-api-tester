import {API_CHANGE, ROUTE_CHANGE} from './actions';
import {setCurrentApi, setCurrentRoute} from './../functions/state';

module.exports = function( apis = [], action ) {
	if ( apis.length === 0 ) {
		return [];
	}

	switch ( action.type ) {
		case API_CHANGE:
			apis = setCurrentApi( apis, action.current );
			break;
		default:
		case ROUTE_CHANGE:
			apis = setCurrentApi( apis );
			apis = setCurrentRoute( apis, action.namespace, action.route );
			break;
	}

	return apis;
};

