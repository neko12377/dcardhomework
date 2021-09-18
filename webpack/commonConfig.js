const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: {
        main: path.resolve("./src/index.tsx")
    },
    output: {
        path: path.resolve("./build/dist"),
        filename: "[name].[contenthash].js",
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                loader: "ts-loader",
                exclude: /(node_modules)/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            // webpack new feature asset modules
            {
                test: /\.(png|jpe?g)$/,
                type: 'asset/resource',
                parser: {
                    dataUrlCondition: {
                        maxSize: 1,
                    }
                },
                generator: {
                    filename: "[name].[hash].[ext]"
                }
            }
        ]
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        modules: [
            path.resolve("./node_modules"),
            path.resolve("./src")
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            cacheGroups: {
                chunks: "all",
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    priority: -10,
                    enforce: true,
                },
            },
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
                template: path.resolve("./src/static/index.html"),
            }
        ),
        new MiniCssExtractPlugin(),
    ],
}
