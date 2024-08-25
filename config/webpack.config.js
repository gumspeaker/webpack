const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const { contextPath, distPath, tempPath, appBuild } = require("./path")

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

/**
 * @return { import('webpack').Configuration }
 */
module.exports = (_, config) => {
  const isEnvDevelopment = config.mode === "development";
  const isEnvProduction = config.mode === "production";
  console.log(isEnvDevelopment, isEnvProduction);

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
      path: isEnvDevelopment ? distPath : appBuild,
      filename: isEnvProduction
        ? "static/js/[name].[contenthash:10].js"
        : "static/js/[name].js",
      chunkFilename: isEnvProduction
        ? "static/js/[name].[contenthash:10].chunk.js"
        : "static/js/[name].chunk.js",
      assetModuleFilename: "static/js/[hash:10][ext][query]",
      clean: true,
      // devtoolModuleFilenameTemplate: isEnvProduction
      //   ? (info) =>
      //     path
      //       .relative(appDirectory, info.absoluteResourcePath)
      //       .replace(/\\/g, "/")
      //   : isEnvDevelopment &&
      //   ((info) =>
      //     path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")),
    },
    devServer: {
      port: 3000,
      hot: true,
      // contentBase: distPath,
      devMiddleware: {
        writeToDisk: true,
      },
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
              test: /\.svg$/,
              use: [
                {
                  loader: require.resolve("@svgr/webpack"),
                  options: {
                    prettier: false,
                    svgo: false,
                    svgoConfig: {
                      plugins: [{ removeViewBox: false }],
                    },
                    titleProp: true,
                    ref: true,
                  },
                },
                {
                  loader: require.resolve("file-loader"),
                  options: {
                    name: "static/media/[name].[hash].[ext]",
                  },
                },
              ],
              issuer: {
                and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
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
              sideEffects: true,
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
      minimize: isEnvProduction,
      minimizer: [],
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
