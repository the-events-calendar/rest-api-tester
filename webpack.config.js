const path = require( 'path' );

const DIST_DIR = path.resolve( __dirname, 'src/resources/js/dist' );
const SRC_DIR = path.resolve( __dirname, 'src/resources/js/src' );

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				include: SRC_DIR,
				use: "babel-loader"
			},
		]
	},
	entry: SRC_DIR + '/entry.js',
	output: {
		path: DIST_DIR,
		filename: 'mtrat-script.js',
	}
};