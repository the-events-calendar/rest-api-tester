const React = window.React || require( 'react' );
const connect = require( 'react-redux' ).connect;
const renderjson = require( 'renderjson' );
import {getColorFromStatus} from './../functions/state';

const Response = function( {response, status, color} ) {
	renderjson.set_show_to_level( 5 );
	const rendered = renderjson( JSON.parse( response ) );
	const html = rendered instanceof HTMLElement ? rendered.outerHTML : '';

	return (
		<div id="trap-response" class="full-width medium-height">
			<div class={'response-header ' + color}>{status}</div>
			<div class='response' dangerouslySetInnerHTML={{__html: html}}></div>
		</div>
	);
};

const mapStateToProps = function( state ) {
	return {
		response: state.response.data,
		status: state.response.status,
		color: getColorFromStatus( state.response.status ),
	};
};

const mapDispatchToProps = function( dispatch ) {
	return {};
};

const ResponseContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)( Response );

module.exports = {Response, ResponseContainer};