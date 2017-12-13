const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx"]
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
      title: "Qwik",
      template: "./src/public/index.html"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Popper: ["popper.js", "default"],
      // In case you imported plugins individually, you must also require them here:
      Util: "exports-loader?Util!bootstrap/js/dist/util",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
    })
  ],
  output: {
    path: __dirname + "/dist/public",
    filename: "[name].bundle.js",
    publicPath: "/"
  }
};
