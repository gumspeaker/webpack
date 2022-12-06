const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackDevServer = require("webpack-dev-server");
const devMode = process.env.NODE_ENV !== "production";
const postCssLoader = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: [
        "postcss-preset-env", // 能解决大多数样式兼容性问题
      ],
    },
  },
};
const sassLoader = {
  loader: "sass-loader",
};
const styleLoader = {
  loader: "style-loader",
};
module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".scss"],
  },
  context: path.resolve(__dirname, "src"),
  entry: {
    index: "./index",
  },
  devServer: {
    host: "localhost",
    port: 3000,
    hot: true,
    compress: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  // mode: devMode ? "production" : "development",
  // devtool: devMode ? "source-map" : "cheap-module-source-map",
  module: {
    rules: [
      // SCSS ALL EXCEPT MODULES
      {
        test: /\.((j|t)(s|sx))$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "swc-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          styleLoader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                mode: "icss",
              },
            },
          },
          // postCssLoader,
          sassLoader,
        ],
      },
      // SCSS MODULES
      {
        test: /\.module\.(sa|sc|c)ss$/i,
        use: [
          styleLoader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                mode: "local",
              },
            },
          },
          // postCssLoader,
          sassLoader,
        ],
      },
    ],
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: path.resolve(__dirname, "/public/index.html"),
  //   }),
  // ],
};
