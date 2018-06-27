const React = window.React || require( 'react' );
const connect = require( 'react-redux' ).connect;
import { changeMethod } from './../functions/dispatchers';
import { __ } from './../functions/l10n';

const Methods = function( { methods, current, onMethodChange } ) {
	if ( ! methods || 0 === methods.length ) {
		return (
			<p>{ __( 'route-no-methods' ) }</p>
		);
	}
	const options = methods.map( function( method ) {
		return (
			<option key={ method.slug } value={ method.slug } selected={ current === method.slug }>
				{ method.name }
			</option>
		);
	} );
	return (
		<legend>
			Method: <select onChange={ function( evt ) {
				onMethodChange( evt.target.value );
			} }
			        >{ options }</select>
		</legend>
	);
};

const mapStateToProps = function( state ) {
	return {
		methods: state.apis.methods,
		current: state.apis.currentMethod.slug,
	};
};

const mapDispatchToProps = function( dispatch ) {
	return {
		onMethodChange: function( method ) {
			dispatch( changeMethod( method ) );
		},
	};
};

const Container = connect(
	mapStateToProps,
	mapDispatchToProps,
)( Methods );

module.exports = { Methods, Container };
