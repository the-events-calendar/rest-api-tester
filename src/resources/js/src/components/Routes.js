const React = window.React || require( 'react' );
const connect = require( 'react-redux' ).connect;
const actions = require( './../reducers/actions' );

const Routes = function( {routes, onRouteSelect} ) {
	const lis = routes.map( function( route ) {
		return (
			<li>
				<a key={route.route} href="#" onClick={function() {
					onRouteSelect( route.route );
				}}>{route.route}</a>
			</li>
		);
	} );
	return (
		<ul>{lis}</ul>
	);
};

const getApiRoutes = function( apis ) {
	const current = apis.filter( function( api ) {
		return true === api.current;
	}, apis );

	if ( 0 === current.length ) {
		return [];
	}

	return current[0].routes;
};

const mapStateToProps = function( state ) {
	return {
		routes: getApiRoutes( state.apis ),
	};
};

const changeRoute = function( route ) {
	return {type: actions.ROUTE_CHANGE, route: route};
};

const mapDispatchToProps = function( dispatch ) {
	return {
		onRouteSelect: function( route ) {
			dispatch( changeRoute( route ) );
		},
	};
};

const RoutesContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)( Routes );

module.exports = {Routes, RoutesContainer};

