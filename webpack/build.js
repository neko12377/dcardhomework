const { CleanWebpackPlugin } = require("clean-webpack-plugin");
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

    ],

    optimization: {},
}