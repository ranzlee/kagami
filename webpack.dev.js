const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  entry: [
    require.resolve("react-hot-loader/patch"),
    require.resolve("webpack-hot-middleware/client"),
    path.join(__dirname, "src/client/index.tsx")
  ],
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ]
});
