const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require("./commonConfig");
const chalk = require("chalk");

console.info(chalk.bold.hex("#09d7d7")("Starting dev-server... 🚀"))
module.exports = {
    mode: "development",
    entry: config.entry,
    output: config.output,
    resolve: config.resolve,
    module: config.module,

    plugins: [...config.plugins,
        new BundleAnalyzerPlugin({
            analyzerPort: 7778,
        }),
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