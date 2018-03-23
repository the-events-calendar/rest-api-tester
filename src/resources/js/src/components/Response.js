const React = window.React || require( 'react' );
const connect = require( 'react-redux' ).connect;
const renderjson = require( 'renderjson' );
import {statusToColor} from './../functions/utils';

const Response = function( {response, status, color} ) {
	if ( status === 'loading' ) {
		return (
			<div id="trap-response" class="full-width">
				<h3 className='response-header'>
					{response}
				</h3>
			</div>
		);
	}

	renderjson.set_show_to_level( 3 );
	const rendered = renderjson( JSON.parse( response ) );
	const html = rendered instanceof HTMLElement ? rendered.outerHTML : '';

	return (
		<div id="trap-response" className="full-width medium-height">
			<div className={'response-header ' + color}>{status}</div>
			<div className='response' dangerouslySetInnerHTML={{__html: html}}></div>
		</div>
	);
};

const mapStateToProps = function( state ) {
	return {
		response: state.response.responseText,
		status: state.response.status,
		color: statusToColor( state.response.status ),
	};
};

const mapDispatchToProps = function( dispatch ) {
	return {};
};

const Container = connect(
	mapStateToProps,
	mapDispatchToProps,
)( Response );

module.exports = {Response, Container};
