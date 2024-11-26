const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./static/frontend"),
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
      ],
    },
    optimization: {
      minimize: true,
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
    ],
    resolve: {
      fallback: {
          async_hooks: false,
          "fs": false,
          "os": false,
          "path": false,
          "http": false,
          "crypto": false
      },
    },
  };