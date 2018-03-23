const path = require( 'path' );
const UnminifiedWebpackPlugin = require( 'unminified-webpack-plugin' );

const DIST_DIR = path.resolve( __dirname, 'src/resources/js/dist' );
const SRC_DIR = path.resolve( __dirname, 'src/resources/js/src' );

module.exports = {
	target: 'web',
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.js$/,
				include: SRC_DIR,
				use: 'babel-loader',
			},
		],
	},
	entry: {
		'mtrat-script': SRC_DIR + '/entry.js',
	},
	devtool: 'source-map',
	output: {
		path: DIST_DIR,
		filename: 'mtrat-script.min.js',
	},
	plugins: [
		new UnminifiedWebpackPlugin(),
	],
};
