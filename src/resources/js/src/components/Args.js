const React = window.React || require( 'react' );
const connect = require( 'react-redux' ).connect;
import {titleize} from './../functions/utils';
import {__} from './../functions/l10n';

const Args = function( {args = []} ) {
	if ( ! args || 0 === args.length ) {
		return (
			<p>{__( 'route-no-args' )}</p>
		);
	}

	let lis = [];
	let arg, input, value, title, description;

	for ( let index in args ) {
		arg = args[index];
		value = arg.default ? arg.default : '';
		title = titleize( index ) + ' ';
		description = arg.description ? arg.description : '';

		switch ( arg.type ) {
			case 'integer':
				input = (
					<legend>
						{title}
						<input type="number" key={index} name={index} defaultValue={value} required={arg.required}/>
						{description}
					</legend>
				);
				break;
			case 'boolean':
				input = (
					<legend>
						{title}
						<input type="checkbox" key={index} name={index} value={value} required={arg.required}/>
						{description}
					</legend>
				);
				break;
			default:
			case 'string':
				input = (
					<legend>
						{title}
						<input type="text" key={index} name={index} defaultValue={value} required={arg.required}/>
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
	return (
		<ul>{lis}</ul>
	);
};

const mapStateToProps = function( state ) {
	return {
		args: state.apis.args,
	};
};

const mapDispatchToProps = function( dispatch ) {
	return {};
};

const Container = connect(
	mapStateToProps,
	mapDispatchToProps,
)( Args );

module.exports = {Args, Container};
