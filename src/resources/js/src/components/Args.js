const React = window.React || require( 'react' );
const connect = require( 'react-redux' ).connect;
import {getCurrentApiRoute} from './../functions/state';
import {titleize} from './../functions/utils';
import {__} from './../functions/l10n';

const Args = function( {route} ) {
	const args = route && route.args ? route.args : [];

	let lis = [];
	let arg, input, value, title, description;

	for ( let index in args ) {
		if ( - 1 !== ['namespace', 'context'].indexOf( index ) ) {
			continue;
		}

		arg = args[index];
		value = arg.default ? arg.default : '';
		title = titleize( index ) + ' ';
		description = arg.description ? arg.description : '';

		switch ( arg.type ) {
			case 'integer':
				input = (
					<legend>
						{title}
						<input type="number" key={index} value={value} required={arg.required}/>
						{description}
					</legend>
				);
				break;
			default:
			case 'string':
				input = (
					<legend>
						{title}
						<input type="text" key={index} value={value} required={arg.required}/>
						{description}
					</legend>
				);
				break;
			case 'boolean':
				input = (
					<legend>
						{title}
						<input type="checkbox" key={index} value={value} required={arg.required}/>
						{description}
					</legend>
				);
				break;
		}

		lis.push( (
			<li>
				{input}
			</li>
		) );
	}
	if ( 0 === lis.length ) {
		return (
			<p>{__( 'route-no-args' )}</p>
		);
	}
	return (
		<ul>{lis}</ul>
	);
};

const mapStateToProps = function( state ) {
	return {
		route: getCurrentApiRoute( state.apis ),
	};
};

const mapDispatchToProps = function( dispatch ) {
	return {};
};

const ArgsContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)( Args );

module.exports = {Args, ArgsContainer};
