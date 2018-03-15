const React = window.React || require( 'react' );
const connect = require( 'react-redux' ).connect;
import {changeRoute} from './../functions/dispatchers';
import {getApiRoutes} from './../functions/state';

const Routes = function( {routes, onRouteSelect} ) {
	const lis = routes.map( function( route ) {
		return (
			<li>
				<a key={route.route} href="#" onClick={function( ev ) {
					ev.stopPropagation();
					ev.nativeEvent.stopImmediatePropagation();
					onRouteSelect( route.namespace, route.route);
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
		routes: getApiRoutes( state.apis ),
	};
};

const mapDispatchToProps = function( dispatch ) {
	return {
		onRouteSelect: function( namespace, route ) {
			dispatch( changeRoute( namespace, route ) );
		},
	};
};

const RoutesContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)( Routes );

module.exports = {Routes, RoutesContainer};

