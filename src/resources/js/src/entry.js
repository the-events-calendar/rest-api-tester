const React = window.React || require( 'react' );
const ReactDom = window.ReactDOM || require( 'react-dom' );
const redux = window.redux || require( 'redux' );
const Provider = require( 'react-redux' ).Provider;
const APIsContainer = require( './components/APIs' ).APIsContainer;
const RoutesContainer = require('./components/Routes').RoutesContainer;

import reducers from './reducers';

const storeInitialState = window.mtrat && window.mtrat.state ? window.mtrat.state : {
	'apis': [],
};

const RestApiTester = function() {
	return (
		<div>
			<APIsContainer/>
			<RoutesContainer/>
		</div>
	);
};

const store = redux.createStore(
	reducers,
	storeInitialState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Redux Dev Tools
);

const wrapperId = 'mtrat-wrapper';

ReactDom.render(
	(
		<Provider store={store}>
			<RestApiTester/>
		</Provider>
	),
	document.getElementById( wrapperId )
);

