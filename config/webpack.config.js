const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const createEnvironmentHash = require("./hash");
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
const appDirectory = fs.realpathSync(process.cwd());
const contextPath = path.resolve(appDirectory, "src");
const distPath = path.resolve(appDirectory, "./dist");
const tempPath = path.resolve(appDirectory, "/public/index.html");
/**
 * @type { import('webpack').Configuration }
 */
module.exports = () => {
  const isEnvDevelopment = process.env.NODE_ENV === "production";
  const isEnvProduction = process.env.NODE_ENV === "production";

  return {
    resolve: {
      extensions: [".tsx", ".js", ".ts", ".jsx"],
    },
    target: "web",
    context: contextPath,
    entry: {
      index: "./index",
    },
    output: {
      path: isEnvDevelopment ? distPath : undefined,
      filename: isEnvDevelopment
        ? "static/js/[name].[contenthash:10].js"
        : "static/js/[name].js",
      chunkFilename: isEnvDevelopment
        ? "static/js/[name].[contenthash:10].chunk.js"
        : "static/js/[name].chunk.js",
      assetModuleFilename: "static/js/[hash:10][ext][query]",
      clean: true,
    },
    devServer: {
      port: 3000,
      hot: true,
      client: {
        overlay: false,
      },
    },
    // cache: {
    //   type: "filesystem",
    //   // version: createEnvironmentHash(env.raw),
    //   cacheDirectory: "node_modules/.cache",
    //   store: "pack",
    //   buildDependencies: {
    //     defaultWebpack: ["webpack/lib/"],
    //     // config: [__filename],
    //   },
    // },
    mode: isEnvDevelopment ? "development" : "production",
    devtool: isEnvDevelopment ? "cheap-module-source-map" : "source-map",
    module: {
      rules: [
        {
          oneOf: [
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
                      getLocalIdent: getCSSModuleLocalIdent,
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
            {
              // Exclude `js` files to keep "css" loader working as it injects
              // by webpacks internal loaders.
              exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              type: "asset/resource",
            },
          ],
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
      isEnvDevelopment && new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: tempPath,
      }),
    ].filter(Boolean),
  };
};
