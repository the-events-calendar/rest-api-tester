const React = window.React || require( 'react' );
const ReactDom = window.ReactDOM || require( 'react-dom' );
const redux = window.redux || require( 'redux' );
const Provider = require( 'react-redux' ).Provider;
const APIs = require( './components/APIs' ).Container;
const Response = require( './components/Response' ).Container;
const Routes = require( './components/Routes' ).Container;
const Args = require( './components/Args' ).Container;
const Users = require( './components/Users' ).Container;
const Methods = require( './components/Methods' ).Container;
const RequestForm = require( './components/RequestForm' ).Container;

import reducers from './reducers';

const storeInitialState = window.mtrat && window.mtrat.state ? window.mtrat.state : {
	apis: { all: [] },
	users: [],
	response: JSON.stringify( {} ),
};

const RestApiTester = function() {
	return (
		<div>
			<Response />
			<APIs />
			<Routes />
			<RequestForm>
				<Methods />
				<Users />
				<Args />
			</RequestForm>
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
		<Provider store={ store }>
			<RestApiTester />
		</Provider>
	),
	document.getElementById( wrapperId ),
);

