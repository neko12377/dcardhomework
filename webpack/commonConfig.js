const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
    entry: path.resolve("./src/index.tsx"),
    output: {
        path: path.resolve("./dist"),
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
}
