const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require("./commonConfig");
const chalk = require("chalk");


console.info(chalk.bold.hex("#09d7d7")("BUILDING...🛠️"));
module.exports = {
    mode: "production",
    entry: config.entry,
    output: config.output,
    resolve: config.resolve,
    module: config.module,

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve("./src/static/index.html"),
        }),
        new MiniCssExtractPlugin(),
    ],

    optimization: {},
}