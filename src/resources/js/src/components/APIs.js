const React = window.React || require( 'react' );
const connect = require( 'react-redux' ).connect;
import {changeApi} from './../functions/dispatchers';
import {__} from './../functions/l10n';

const APIs = function( {apis, current, onApiSelect} ) {
	if ( ! apis || 0 === apis.length ) {
		return (
			<p>{__( 'no-apis' )}</p>
		);
	}

	const lis = apis.map( function( api ) {
		return (
			<li>
				<input type="radio" key={api.slug} name={api.slug} onClick={function() {
					onApiSelect( api.slug );
				}} checked={current === api.slug}/>
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
		apis: state.apis.all,
		current: state.apis.current.slug,
	};
};

const mapDispatchToProps = function( dispatch ) {
	return {
		onApiSelect: function( slug ) {
			dispatch( changeApi( slug ) );
		},
	};
};

const Container = connect(
	mapStateToProps,
	mapDispatchToProps,
)( APIs );

module.exports = {APIs, Container};

