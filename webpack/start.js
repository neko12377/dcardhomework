const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require("./commonConfig");
const path = require("path");
const chalk = require("chalk");

console.info(chalk.bold.hex("#09d7d7")("Starting dev-server... 🚀"))
module.exports = {
    mode: "development",
    entry: config.entry,
    output: config.output,
    resolve: config.resolve,
    module: config.module,

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve("./src/static/index.html"),
        }),
        new MiniCssExtractPlugin()
    ],

    devServer: {
        port: 3333,
        proxy: {
            "/proxy_domain": {
                target: "http://localhost:5000"
            }
        }
    },
    devtool: "eval-cheap-module-source-map",
}