var path = require('path')
var webpack = require('webpack')

module.exports = {
	entry: './app/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/, 
				use: {
					loader:'babel-loader',
					options:{
						presets: ['es2015']
					}
				},
			},
			{
				test: /\.vue$/,
				use: {
					loader:'vue-loader',
				},
			},
			{
				test: /\.pug$/,
				use: {
					loader:'pug-loader',
				},
			},
		],

	},
	resolve:{
		alias: {
			vue: 'vue/dist/vue.js'
		},
	},
	devtool: 'inline-source-map' 
}
