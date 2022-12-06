const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
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
console.log(devMode, "devMode");

module.exports = {
  resolve: {
    extensions: [".tsx", ".js", ".ts", ".jsx"],
  },
  target: "web",
  context: path.resolve(__dirname, "src"),
  entry: {
    index: "./index",
  },
  output: {
    path: devMode ? path.resolve(__dirname, "../dist") : undefined,
    filename: devMode
      ? "static/js/[name].[contenthash:10].js"
      : "static/js/[name].js",
    chunkFilename: devMode
      ? "static/js/[name].[contenthash:10].chunk.js"
      : "static/js/[name].chunk.js",
    assetModuleFilename: "static/js/[hash:10][ext][query]",
    clean: true,
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
  mode: devMode ? "production" : "development",
  devtool: devMode ? "source-map" : "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.((j|t)s(x?))$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "swc-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        exclude: /\.module\.(sa|sc|c)ss$/i,
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
          postCssLoader,
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
          postCssLoader,
          sassLoader,
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    usedExports: true,
    sideEffects: true,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
          name: "chunk-react",
          priority: 40,
        },
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: "chunk-antd",
          priority: 30,
        },
        libs: {
          test: /[\\/]node_modules[\\/]/,
          name: "chunk-libs",
          priority: 20,
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },

  plugins: [
    devMode && new ReactRefreshWebpackPlugin(),
    // new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "/public/index.html"),
    }),
    // devMode && new webpack.HotModuleReplacementPlugin(), // 作用：HMR插件将HMR Runtime代码嵌入到bundle中，能够操作APP代码，完成代码替换
    // new webpack.NoEmitOnErrorsPlugin(),
  ].filter(Boolean),
};
