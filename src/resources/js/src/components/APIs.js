const React = window.React || require( 'react' );
const connect = require( 'react-redux' ).connect;
import {changeApi} from './../functions/dispatchers';
import {setCurrentApi} from './../functions/state';

const APIs = function( {apis, onApiSelect} ) {
	if ( 0 !== apis.length ) {
		apis = setCurrentApi( apis );
	}

	const lis = apis.map( function( api ) {
		return (
			<li>
				<input type="radio" key={api.slug} name={api.slug} onClick={function() {
					onApiSelect( api.slug );
				}} checked={api.current}/>
				<label htmlFor={api.slug}>{api.name}</label>
			</li>
		);
	} );
	return (
		<ul>{lis}</ul>
	);
};

const mapStateToProps = function( state ) {
	return {
		apis: state.apis,
	};
};

const mapDispatchToProps = function( dispatch ) {
	return {
		onApiSelect: function( slug ) {
			dispatch( changeApi( slug ) );
		},
	};
};

const APIsContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)( APIs );

module.exports = {APIs, APIsContainer};

