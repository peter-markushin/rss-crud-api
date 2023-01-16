const path = require('path');
const dotenv = require('dotenv-webpack');

module.exports = {
    target: 'node',
    mode: 'production',
    devtool: 'inline-source-map',
    plugins: [
        new dotenv()
    ],
    entry: {
        main: './src/index.ts',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                include: [path.resolve(__dirname, './src')],
                exclude: [
                    '/node_modules/',
                    '/build/',
                    '/__tests__/',
                ]
            },
        ],
    },
    experiments: {
        topLevelAwait: true
    }
};
