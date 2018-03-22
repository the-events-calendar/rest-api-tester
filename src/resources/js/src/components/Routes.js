const React = window.React || require( 'react' );
const connect = require( 'react-redux' ).connect;
import {changeRoute} from './../functions/dispatchers';
import {__} from './../functions/l10n';

const Routes = function( {routes, current, onRouteSelect} ) {
	if ( ! routes || 0 === routes.length ) {
		return (
			<p>{__( 'api-no-routes' )}</p>
		);
	}

	const lis = routes.map( function( route ) {
		return (
			<li>
				<a className={current === route.route ? 'current' : ''}
				   key={route.route}
				   href="#"
				   onClick={function( ev ) {
					   ev.stopPropagation();
					   ev.nativeEvent.stopImmediatePropagation();
					   onRouteSelect( route.route );
				   }}>{route.route}</a>
			</li>
		);
	} );
	return (
		<ul>{lis}</ul>
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

module.exports = {Routes, Container};

