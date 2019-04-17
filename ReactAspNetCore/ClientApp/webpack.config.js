const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (_, argv) => {
    const sharedConfig = () => ({
        output: {
            filename: '[name].js',
            publicPath: '/dist/'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader'
                }
            ]
        },
        plugins: [],
        resolve: {
            extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
            plugins: [
                new TsconfigPathsPlugin({ configFile: 'tsconfig.json' })
            ],
            alias: {
                'react-dom': '@hot-loader/react-dom'
            }
        },
        mode: "development"
    });
    
    const clientOutputDir = '../wwwroot/dist';
    const clientConfig = merge(sharedConfig(), {
        entry: {
            app: './boot-client.tsx'
        },
        output: {
            path: path.join(__dirname, clientOutputDir)
        },
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
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require(path.join(clientOutputDir, 'vendor-manifest.json'))
            })
        ],
        optimization: {
            minimizer: [new TerserJSPlugin({ extractComments: true, sourceMap: true }), new OptimizeCSSAssetsPlugin({ sourceMap: true })]
        },
        devtool: argv && argv.mode === 'production' ? 'source-map' : 'eval-source-map'
    });

    // Configuration for server-side (prerendering) bundle suitable for running in Node
    const serverConfig = merge(sharedConfig(), {
        resolve: { mainFields: ['main'] },
        entry: { 'main-server': './boot-server.tsx' },
        output: {
            libraryTarget: 'commonjs',
            path: path.join(__dirname, './dist')
        },
        target: 'node',
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require(path.join(__dirname, 'dist', 'vendor-manifest.json')),
                sourceType: 'commonjs2',
                name: './vendor'
            })
        ]
    });

    return [clientConfig, serverConfig];
};
