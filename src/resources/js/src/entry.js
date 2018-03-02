const React = window.React || require( 'react' );
const ReactDom = window.ReactDOM || require( 'react-dom' );

const wrapperId = 'mtrat-wrapper';

const helloWorldElement = <h1>Hello World</h1>;
ReactDom.render( helloWorldElement, document.getElementById( wrapperId ) );

