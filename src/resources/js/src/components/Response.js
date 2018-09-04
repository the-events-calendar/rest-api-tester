const React = window.React || require( 'react' );
const connect = require( 'react-redux' ).connect;
import {statusToColor, recursiveDecode} from './../functions/utils';
import ReactJson from 'react-json-view';

const Response = function( { response, status, color } ) {
	if ( status === 'loading' ) {
		return (
			<div id="trap-response" class="full-width">
				<h3 className="response-header">
					{ response }
				</h3>
			</div>
		);
	}

	return (
		<div id="trap-response" className="full-width medium-height">
			<div className={ 'response-header ' + color }>{ status }</div>
			<ReactJson src={ JSON.parse( response ) } theme="monokai" />
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

module.exports = { Response, Container };
