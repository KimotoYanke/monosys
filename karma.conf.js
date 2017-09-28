module.exports = function (config) {
    config.set({

        basePath: '',

        frameworks: ['mocha', 'chai'],
        plugins: [
            'karma-phantomjs-launcher',
            'karma-mocha',
            'karma-chai',
            'karma-coverage',
            'karma-sourcemap-loader',
            'karma-spec-reporter',
            'karma-webpack'
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

        reporters: ['spec', 'coverage'],

        coverageReporter: {
            dir: './coverage',
            reporters: [
                { type: 'text' },
                { type: 'html' },
                { type: 'lcov', subdir: '.' }
            ]
        },

        port: 9876,

        colors: true,

        singleRun: true,

        logLevel: config.LOG_INFO,

        browsers: ['PhantomJS'],

        mime: {
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
