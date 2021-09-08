const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "../src/app/index.tsx"),
    output: {
        path: path.resolve("./dist"),
        filename: "[name].[contenthash].js",
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        modules: [
            path.resolve("./src"),
            path.resolve("./node_modules"),
        ],
    },

    module: {
        rules: [{
            test: /(.tsx?$)/,
            loader: "ts-loader",
            exclude: /(node_modules)/
        }],
    },

    plugins: [new HtmlWebpackPlugin({
        template: "./static/index.html",
    })],

    devServer: {
        port: 8888,
    },
    devtool: "eval-cheap-module-source-map",
}