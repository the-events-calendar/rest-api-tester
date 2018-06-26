const titleize = ( slug ) => {
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

	return query.split( '&' ).filter( ( dataEntry ) => {
		return ! emptyData.test( dataEntry ) && ! userPattern.test( dataEntry );
	} ).reduce( ( dataCouples, couple ) => {
		const split = couple.split( '=' );
		dataCouples[split[0]] = split[1];

		return dataCouples;
	}, {} );
};

const replaceDataInRegex = function ( regexString, data ) {
	for ( let key in data ) {
		const dataValue = data[key];
		const regExp = new RegExp( '(.*)(\\(.*?<' + key + '>.*?\\))(.*)' );

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