var webpack = require('webpack')

module.exports = function (config) {
	config.set({

		basePath: '',

		frameworks: ['mocha', 'chai'],
		plugins: [
			'karma-phantomjs-launcher',
			'karma-mocha',
			'karma-chai',
			'karma-coverage',
			'karma-coveralls',
			'karma-mocha-reporter',
			'karma-sourcemap-loader',
			'karma-webpack'
		],

		files: [
			'app/test/index.spec.js'
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
		mime: {
			'text/x-typescript': ['ts','tsx'],
			'text/javascript': ['js'],
		},

		webpack: {
			module: {
				rules: [
					{
						test: /\.vue$/,
						loaders: ['istanbul-instrumenter-loader', 'vue-loader']
					},
					{
						test: /\.js$/,
						exclude: /node_modules/,
						loaders: ['istanbul-instrumenter-loader', 'babel-loader']
					}
				]

			},
			resolve: {
				alias: {
					vue: 'vue/dist/vue.js'
				},
				extensions: ['.js', '.vue', '.json']
			},
			devtool: 'inline-source-map'
		}
	})
}
