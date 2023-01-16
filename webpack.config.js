const path = require('path');

module.exports = {
    target: 'node',
    mode: 'production',
    devtool: 'inline-source-map',
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
            },
        ],
    },
    experiments: {
        topLevelAwait: true
    }
};
