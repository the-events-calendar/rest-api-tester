const React = window.React || require( 'react' );
const connect = require( 'react-redux' ).connect;

import {API_CHANGE,} from './../actions'

const APIs = function( {apis, onApiSelect} ) {
	const lis = apis.map( function( api ) {
		return (
			<li key={api.slug} onClick={function() {
				onApiSelect( api.slug );
			}}>{api.name}</li>
		)
	} );
	return (
		<ul>{lis}</ul>
	)
};

const mapStateToProps = function( state ) {
	return {
		apis: state.apis,
	};
};

const changeApi = function( slug ) {
	return {type: API_CHANGE, selected: slug};
};

const mapDispatchToProps = function( dispatch ) {
	return {
		onApiSelect: function( slug ) {
			dispatch( changeApi( slug ) );
		}
	};
};

const APIsContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)( APIs );

module.exports = {APIsContainer};

