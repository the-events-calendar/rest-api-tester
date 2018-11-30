const React = window.React || require( 'react' );
const connect = require( 'react-redux' ).connect;
import { changeResponse, submitRequest } from './../functions/dispatchers';
import { __ } from './../functions/l10n';
import { parseQuery, replaceDataInRegex } from '../functions/utils';

const $ = window.jQuery;
const mtrat = window.mtrat || {
	nonce: '',
	url: '',
};

const RequestForm = function( { children, nonce, restUrl, method, onRequestSubmit, onSuccess, onFailure } ) {
	const sendRequest = function( ev ) {
		ev.preventDefault();
		ev.stopPropagation();

		const adminNonce = $( '#mtrat-nonce' ).val();

		if ( ! adminNonce ) {
			return;
		}

		const $form = $( ev.target ).closest( 'form' );
		const formData = $form.serialize();

		const data = parseQuery( formData );

		restUrl = replaceDataInRegex( restUrl, data );

		data.action = 'mtrat';
		data[ 'mtrat-nonce' ] = adminNonce;

		const user = $form.find( '[name="user"]' ).val();

		onRequestSubmit();

		var settings = {
			accepts: 'application/json',
			method: method,
			beforeSend: function( xhr ) {
				xhr.setRequestHeader( 'X-WP-Nonce', nonce );
				xhr.setRequestHeader( 'X-REST-API-User', user );
			},
			data: data,
		};

		// DELETE requests need to send their data as part of the URL args.
		if ( 'delete' === method.toLowerCase() ) {
			restUrl += '?' + $.param( data );

			settings.data = {};
		}

		$.ajax( restUrl, settings ).then( onSuccess, onFailure );
	};

	return (
		<div>
			<h2>{ __( 'request-title' ) }</h2>
			<form id="mtrat-form">
				{ children }
				<input
					type="submit"
					className="button-primary"
					onSubmit={ sendRequest }
					onClick={ sendRequest }
					value={ __( 'request-button-text' ) }
				/>
			</form>
		</div>
	);
};

const mapStateToProps = function( state ) {
	return {
		nonce: mtrat.nonce,
		restUrl: `${ mtrat.url }${ state.apis.currentRoute.route }`,
		method: state.apis.currentMethod.name,
	};
};

const mapDispatchToProps = function( dispatch ) {
	return {
		onRequestSubmit: function() {
			dispatch( submitRequest() );
		},
		onSuccess: function( response ) {
			dispatch( changeResponse( { status: 200, responseText: JSON.stringify( response ) } ) );
		},
		onFailure: function( response ) {
			dispatch( changeResponse( response ) );
		},
	};
};

const Container = connect(
	mapStateToProps,
	mapDispatchToProps,
)( RequestForm );

module.exports = { RequestForm, Container };
