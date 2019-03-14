const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/react",
              {
                plugins: ["@babel/plugin-proposal-class-properties"]
              }
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000'
      }

    ]
  },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [htmlWebpackPlugin]
};
