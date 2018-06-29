const React = window.React || require( 'react' );
const connect = require( 'react-redux' ).connect;
import { changeRoute } from './../functions/dispatchers';
import { __ } from './../functions/l10n';

const Routes = function( { routes, current, onRouteSelect } ) {
	if ( ! routes || 0 === routes.length ) {
		return (
			<div>
				{ __( 'routes-title' ) }
				<p>{ __( 'api-no-routes' ) }</p>
			</div>
		);
	}

	const lis = routes.map( function( route ) {
		return (
			<li>
				<a
					className={ current === route.route ? 'current' : '' }
					key={ route.route }
					href="#"
					onClick={ function( ev ) {
					   ev.preventDefault();
					   ev.stopPropagation();
					   onRouteSelect( route.route );
				   } }
				>{ route.route }</a>
			</li>
		);
	} );
	return (
		<div>
			<h2>{ __( 'routes-title' ) }</h2>
			<ul>{ lis }</ul>
		</div>
	);
};

const mapStateToProps = function( state ) {
	return {
		routes: state.apis.routes,
		current: state.apis.currentRoute.route,
	};
};

const mapDispatchToProps = function( dispatch ) {
	return {
		onRouteSelect: function( route ) {
			dispatch( changeRoute( route ) );
		},
	};
};

const Container = connect(
	mapStateToProps,
	mapDispatchToProps,
)( Routes );

module.exports = { Routes, Container };

