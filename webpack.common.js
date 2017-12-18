const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// This helper function is not strictly necessary.
// I just don't like repeating the path.join a dozen times.
function srcPath(subdir) {
  return path.join(__dirname, "src", subdir);
}

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
    alias: {
      actions: srcPath('public/actions'),
      apis: srcPath('public/apis'),
      components: srcPath('public/components'),
      containers: srcPath('public/containers'),
      reducers: srcPath('public/reducers'),
      types: srcPath('public/types'),
      shared: srcPath('shared'),
      store: srcPath('public/Store'),
      types: srcPath('public/types')
    }
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: require.resolve("ts-loader")
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(png|svg|jpg|gif|ttf|eot)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Kagami",
      template: "./src/public/index-template.html"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Popper: ["popper.js", "default"]
    }),
    new CleanWebpackPlugin(['dist'])
  ],
  output: {
    path: __dirname + "/dist/public",
    filename: "[name].bundle.js",
    publicPath: "/"
  }
};
