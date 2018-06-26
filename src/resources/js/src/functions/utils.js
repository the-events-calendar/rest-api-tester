const titleize = function ( slug ) {
	return slug.replace( /[-_]/g, ' ' ).replace( /\b[a-z]/g, function () {
		return arguments[0].toUpperCase();
	} );
};

const statusToColor = function ( status ) {
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
};

const parseQuery = function ( query ) {
	const emptyData = new RegExp( '^[^=]+=$' );
	const userPattern = new RegExp( '^user=.*' );
	const dataFrags = query.split( '&' ).filter( function ( dataEntry ) {
		return ! emptyData.test( dataEntry ) && ! userPattern.test( dataEntry );
	} );

	let dataCouples = {};
	for ( let couple of dataFrags ) {
		let split = couple.split( '=' );
		dataCouples[split[0]] = split[1];
	}

	return dataCouples;
};

const replaceDataInRegex = function ( regexString, data ) {
	for ( let key in data ) {
		let dataValue = data[key];
		let regExp = new RegExp( '(.*)(\\(.*?<' + key + '>.*?\\))(.*)' );

		if ( regExp.test( regexString ) ) {
			regexString = regexString.replace( regExp, '$1' + dataValue + '$3' );
			delete data[key]
		}
	}

	return regexString;
};

module.exports = {
	titleize,
	statusToColor,
	parseQuery,
	replaceDataInRegex,
};