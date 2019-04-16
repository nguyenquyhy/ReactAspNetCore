const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = () => {
    const sharedConfig = {
        mode: "development",
        stats: { modules: false },
        resolve: {
            extensions: ['.js'],
            alias: {
                'react-dom': '@hot-loader/react-dom'
            }
        },
        module: {
            rules: [
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' }
            ]
        },
        entry: {
            vendor: [
                'react',
                'react-dom',
                '@hot-loader/react-dom'
            ]
        },
        output: {
            publicPath: 'dist/',
            filename: '[name].js',
            library: '[name]_[hash]'
        },
        plugins: [
            //new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, require.resolve('node-noop')), // Workaround for https://github.com/andris9/encoding/issues/16
        ]
    };

    const clientOutputDir = '../wwwroot/dist';
    const clientConfig = merge(sharedConfig, {
        output: { path: path.join(__dirname, clientOutputDir) },
        module: {
            rules: [
                {
                    test: /\.css(\?|$)/, use: [
                        { loader: MiniCssExtractPlugin.loader, options: { publicPath: './' } },
                        'css-loader'
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new webpack.DllPlugin({
                path: path.join(__dirname, clientOutputDir, '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ],
        optimization: {
            minimizer: [new TerserJSPlugin({ extractComments: true }), new OptimizeCSSAssetsPlugin({})]
        }
    });

    const serverConfig = merge(sharedConfig, {
        target: 'node',
        resolve: { mainFields: ['main'] },
        output: {
            path: path.join(__dirname, 'dist'),
            libraryTarget: 'commonjs2'
        },
        module: {
            rules: [{ test: /\.css(\?|$)/, use: 'css-loader' }]
        },
        entry: { vendor: ['aspnet-prerendering', 'react-dom/server'] },
        plugins: [
            new webpack.DllPlugin({
                path: path.join(__dirname, 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ]
    });

    return [clientConfig, serverConfig];
};
