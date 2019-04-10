const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = () => {
    const clientOutputDir = '../wwwroot/dist';
    const clientConfig = {
        entry: {
            app: './boot-client.tsx'
        },
        output: {
            filename: '[name].js',
            publicPath: '/dist/',
            path: path.join(__dirname, clientOutputDir)
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
            ]
        },
        mode: "development"
    };

    return [clientConfig];
};
