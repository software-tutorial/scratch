const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '.'),
        },
        compress: true,
        port: 4200
    },
    plugins: [new HtmlWebpackPlugin({
        title: "Hello World",
        hash: true
    })]
}
