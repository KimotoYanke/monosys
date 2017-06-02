var path = require('path')
var webpack = require('webpack')

module.exports = {
	entry: './app/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.(js|vue)$/,
				loader: 'eslint-loader',
				enforce: 'pre',
				include: [resolve('app'), resolve('test')],
				options: {
					formatter: require('eslint-friendly-formatter')
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/, 
				query:{
					presets: ['es2015']
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader'
			},
		]
	},
	resolve:{
		alias: {
			vue: 'vue/dist/vue.js'
		},
	},
	devtool: 'inline-source-map' 
}
