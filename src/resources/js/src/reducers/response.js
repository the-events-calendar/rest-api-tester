import {LOADING, RESPONSE_CHANGE} from './../reducers/actions';
import {__} from './../functions/l10n';

module.exports = function( response = {}, action ) {
	switch ( action.type ) {
		case LOADING:
			response = {
				status: 'loading',
				responseText: __( 'loading-text' ),
			};
			break;
		case RESPONSE_CHANGE:
			response = {
				status: action.status,
				responseText: action.responseText,
			};
			break;
		default:
			response = {...response};
			break;
	}

	return response;
};
