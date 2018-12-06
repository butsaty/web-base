var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ExtractTextPluginConfig = new ExtractTextPlugin(
    "styles_bundle.css"
);

module.exports = {
    entry: [
        './app/js/app.js', './app/js/app2.js',
        './app/css/style1.css', './app/css/style2.css'
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'scripts_bundle.js'
    },
    module: {
        preLoaders: [
            {
                test: /\.css$/,
                exclude: /styles/, 
                loader: 'import-glob-loader'
            }
        ],
        loaders: [
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader'
            },
            { 
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            { 
                test: /\.json$/, 
                loader: 'json' 
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        HtmlWebpackPluginConfig,
        ExtractTextPluginConfig
    ]
}