// var webpack = require('webpack')

module.exports = function (config) {
	config.set({

		basePath: '',

		frameworks: ['mocha', 'chai'],

		files: [
			'app/test/*.spec.js'
		],

		exclude: [
		],

		preprocessors: {
			'app/test/*.spec.js': ['webpack', 'sourcemap']
		},

		reporters: ['mocha', 'coverage', 'coveralls'],

		coverageReporter: {
			reporters: [
				{ type: 'text' },
				{ type: 'lcov' },
				{ type: 'html' }
			]
		},

		port: 9876,

		colors: true,

		logLevel: config.LOG_INFO,

		autoWatch: false,

		browsers: ['PhantomJS'],

		singleRun: false,
		concurrency: Infinity,

		webpack: {
			module: {
				rules: [
					{
						test: /\.vue$/,
						loaders: ['istanbul-instrumenter-loader', 'vue-loader']
					},
					{
						test: /\.js$/,
						loaders: ['istanbul-instrumenter-loader', 'babel-loader']
					}
				]

			},
			resolve: {
				alias: {
					vue: 'vue/dist/vue.js'
				}
			},
			devtool: 'inline-source-map'
		}
	})
}
