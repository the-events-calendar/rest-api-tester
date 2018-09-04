const he = require( 'he' );

const titleize = ( slug ) => {

	return slug.replace( /[-_]/g, ' ' ).replace( /\b[a-z]/g, function() {
		return arguments[ 0 ].toUpperCase();
	} );
};

const statusToColor = ( status ) => {
	if ( ! status ) {
		return '';
	}

	let color = 'green';

	if ( status >= 300 && status < 400 ) {
		// redirection
		color = 'orange';
	} else if ( status >= 400 && status < 500 ) {
		// bad request
		color = 'red';
	} else if ( status >= 500 ) {
		// internal error
		color = 'white';
	}

	return color;
}

const parseQuery = ( query ) => {
	const emptyData = new RegExp( '^[^=]+=$' );
	const userPattern = new RegExp( '^user=.*' );
	const plusSign = /\+/g;

	return query.split( '&' ).filter( ( dataEntry ) => {
		return ! emptyData.test( dataEntry ) && ! userPattern.test( dataEntry );
	} ).reduce( ( dataCouples, couple ) => {
		const split = couple.split( '=' );
		dataCouples[ decodeURIComponent( split [0].replace( plusSign, '%20' ) ) ] = decodeURIComponent( split[1].replace( plusSign, '%20' ) );

		return dataCouples;
	}, {} );
};

const replaceDataInRegex = ( regexString, data ) => {
	for ( const key in data ) {
		const dataValue = data[ key ];
		const regExp = new RegExp( '(.*)(\\(.*?<' + key + '>.*?\\))(.*)' );

		if ( regExp.test( regexString ) ) {
			regexString = regexString.replace( regExp, '$1' + dataValue + '$3' );
			delete data[ key ];
		}
	}

	return regexString;
};

const recursiveDecode = ( value ) => {
	const plusSign = /\+/g;

	if ( Array.isArray( value ) ) {
		return value.map( ( v ) => {
			return typeof v === 'string' ? he.decode( v ).replace( plusSign, ' ' ) : v;
		} );
	}

	if ( typeof value === 'object' ) {
		for ( const prop in Object.keys( value ) ) {
			if ( ! value.hasOwnProperty( prop ) ) {
				continue;
			}
			value[prop] = typeof  value === 'string' ? he.decode( value[prop] ).replace( plusSign, ' ' ) : value;
		}
		return value;
	}

	return typeof  value === 'string' ? he.decode( value ).replace( plusSign, ' ' ) : value;
};

module.exports = {
	titleize,
	statusToColor,
	parseQuery,
	replaceDataInRegex,
	recursiveDecode
};
