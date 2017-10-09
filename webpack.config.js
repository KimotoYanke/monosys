var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = [{
    entry: './app/src/main.js',
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
                    loader: 'babel-loader'
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
    devtool: 'inline-source-map'
},
{
    entry: './app/src/stylesheets/index',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.css'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
            },
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
            }
        ]

    },
    resolve: {
        extensions: ['.css', '.sass', '.scss', '.js']
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
    devtool: 'inline-source-map'
}]
