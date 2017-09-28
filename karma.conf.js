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
            'karma-spec-reporter',
            'karma-webpack',
            'karma-remap-istanbul'
        ],

        files: [
            './node_modules/babel-polyfill/dist/polyfill.min.js',
            './app/test/index.spec.js'
        ],

        exclude: [
        ],

        preprocessors: {
            'app/test/*.spec.js': ['webpack', 'sourcemap']
        },

        reporters: ['spec', 'coverage', 'coveralls'],

        coverageReporter: {
            dir: './coverage',
            reporters: [
                { type: 'lcov' },
                { type: 'text' }
            ]
        },

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['PhantomJS'],

        mime: {
            'text/x-typescript': ['ts', 'tsx'],
            'text/javascript': ['js']
        },

        webpackMiddleware: {
            quiet: true
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
            devtool: 'cheap-module-source-map'
        }
    })
}
