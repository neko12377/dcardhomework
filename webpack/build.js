const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.info(path.resolve("."));
module.exports = {
    mode: "production",
    entry: path.resolve("./src/app/index.tsx"),
    output: {
        path: path.resolve("./dist"),
        filename: "[name].[contenthash].js",
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        modules: [
            path.resolve("./node_modules"),
            path.resolve("./src")
        ]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /(node_modules)/,
            },
            // webpack new feature asset modules
            {
                test: /\.png$/,
                type: 'asset/resource'
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./static/index.html",
        })
    ],

    optimization: {},
}