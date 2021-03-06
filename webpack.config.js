var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
	context: path.join(__dirname, "src"),
	devtool: debug ? "inline-sourcemap" : null,
	entry: {
		app: './js/certigoapp.jsx',
		vendor: ['react']
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0'],
					plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
				}
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		root: path.resolve('.'),
	},
	output: {
		path: __dirname + "/src/",
		filename: 'bundle.js'
	},
	externals: {
		'react/addons': true,
		'react/lib/ExecutionEnvironment': true,
		'react/lib/ReactContext': true
	},
	plugins: debug
		? [new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')]
		: [
			new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
		],
};
