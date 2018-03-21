import {USER_CHANGE} from './actions';
import {setCurrentUser} from './../functions/state';

module.exports = function( users = [], action ) {
	if ( users.length === 0 ) {
		return [];
	}

	switch ( action.type ) {
		case USER_CHANGE:
			users = setCurrentUser( users, action.current );
			break;
		default:
			users = setCurrentUser( users, users[0].ID );
	}

	return users;
};
