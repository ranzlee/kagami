const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: [
    require.resolve("react-hot-loader/patch"),
    require.resolve("webpack-hot-middleware/client"),
    path.join(__dirname, "src/index.tsx")
  ],
  devtool: "inline-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx"]
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: require.resolve("ts-loader"),
        exclude: "/node_modules/"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: "Development",
      template: "./src/index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    //todo: research and understand these modules
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    publicPath: "/"
  }
};
