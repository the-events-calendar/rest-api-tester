const React = window.React || require( 'react' );
const connect = require( 'react-redux' ).connect;
import {changeUser} from './../functions/dispatchers';

const Users = function( {users, onUserSelect} ) {
	const options = users.map( function( user ) {
		return (
			<option key={user.ID} value={user.ID} onSelect={function() {
				onUserSelect( users, user.ID );
			}}>
				{user.data.display_name} - ({user.roles.join( ', ' )})
			</option>
		);
	} );
	return (
		<select>{options}</select>
	);
};


const mapStateToProps = function( state ) {
	return {
		users: state.users,
	};
};

const mapDispatchToProps = function( dispatch ) {
	return {
		onUserSelect: function( ID ) {
			dispatch( changeUser( ID ) );
		},
	};
};

const Container = connect(
	mapStateToProps,
	mapDispatchToProps,
)( Users );

module.exports = {Users, Container};
