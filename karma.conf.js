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
            'karma-webpack'
        ],

        files: [
            './node_modules/babel-polyfill/dist/polyfill.min.js',
            './app/test/index.spec.js'
        ],

        exclude: [
        ],

        preprocessors: {
            'app/test/*.spec.js': ['webpack', 'sourcemap', 'coverage']
        },

        reporters: ['spec', 'coverage', 'coveralls'],

        coverageReporter: {
            reporters: [
                { type: 'text' },
                { type: 'lcov', dir: './coverage' }
            ]
        },

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['PhantomJS'],

        mime: {
            'text/x-typescript': ['ts', 'tsx'],
            'text/javascript': ['js']
        },

        webpack: {
            entry: [
                './app/src/main.js'
            ],
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['es2015']
                            }
                        }
                    },
                    {
                        test: /\.vue$/,
                        use: {
                            loader: 'vue-loader',
                            options: {
                                scss: 'vue-style-loader!css-loader!sass-loader',
                                sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                            }
                        }
                    },
                    {
                        test: /\.pug$/,
                        use: {
                            loader: 'pug-loader'
                        }
                    },
                    {
                        test: /\.json$/,
                        use: {
                            loader: 'json-loader'
                        }
                    },
                    {
                        test: /\.css$/,
                        use: [{
                            loader: 'style-loader'
                        }, {
                            loader: 'css-loader'
                        }]
                    },
                    {
                        test: /\.sass$/,
                        use: [{
                            loader: 'style-loader'
                        }, {
                            loader: 'css-loader'
                        }, {
                            loader: 'sass-loader',
                            options: {
                            }
                        }]
                    }
                ]

            },
            resolve: {
                alias: {
                    vue: 'vue/dist/vue.js'
                },
                extensions: ['.js', '.vue', '.json']
            },
            devtool: '#inline-source-map'
        }
    })
}
