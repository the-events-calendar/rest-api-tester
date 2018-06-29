const React = window.React || require( 'react' );
const connect = require( 'react-redux' ).connect;

const Users = function( { users } ) {
	const options = users.map( function( user ) {
		return (
			<option key={ user.ID } value={ user.ID }>
				{ user.data.display_name } - ({ user.roles.join( ', ' ) })
			</option>
		);
	} );
	return (
		<legend>
			User: <select name="user">{ options }</select>
		</legend>
	);
};

const mapStateToProps = function( state ) {
	return {
		users: state.users,
	};
};

const mapDispatchToProps = function( dispatch ) {
	return {};
};

const Container = connect(
	mapStateToProps,
	mapDispatchToProps,
)( Users );

module.exports = { Users, Container };
