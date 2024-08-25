// const path = require("path");
// const fs = require("fs");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// // const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
// const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
// const createEnvironmentHash = require("./hash");
// const {
//   appDirectory,
//   appHtml,
//   appSrc,
//   distPath,
//   appTsConfig,
// } = require("./path");
// const postCssLoader = {
//   loader: "postcss-loader",
//   options: {
//     postcssOptions: {
//       plugins: [
//         "postcss-preset-env", // 能解决大多数样式兼容性问题
//       ],
//     },
//   },
// };
// const sassLoader = {
//   loader: "sass-loader",
// };
// const styleLoader = {
//   loader: "style-loader",
// };
// function getTSLoaderOptions() {
//   const tscConfig = require(appTsConfig);
//   const options = {
//     // Just for simplicity, not all the values in tscConfig are compilerOptions
//     compilerOptions: { ...tscConfig },
//   };
//   if (tscConfig.project) {
//     options.configFile = tscConfig.project;
//   }
//   return options;
// }
// /**
//  * @return { import('webpack').Configuration }
//  */
// module.exports = (_, config) => {
//   const isEnvDevelopment = config.mode === "development";
//   const isEnvProduction = config.mode === "production";
//   console.log(isEnvDevelopment, isEnvProduction);

//   return {
//     resolve: {
//       extensions: [".tsx", ".js", ".ts", ".jsx"],
//     },
//     // target: "web",
//     context: appSrc,
//     entry: {
//       index: "./export",
//     },
//     output: {
//       path: isEnvDevelopment ? distPath : undefined,
//       assetModuleFilename: "static/js/[name][ext]",
//       clean: true,
//       devtoolModuleFilenameTemplate: isEnvProduction
//         ? (info) =>
//             path
//               .relative(appDirectory, info.absoluteResourcePath)
//               .replace(/\\/g, "/")
//         : isEnvDevelopment &&
//           ((info) =>
//             path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")),
//     },
//     devServer: {
//       port: 3000,
//       hot: true,
//       client: {
//         overlay: false,
//       },
//     },
//     mode: isEnvDevelopment ? "development" : "production",
//     devtool: isEnvDevelopment ? "cheap-module-source-map" : "source-map",
//     module: {
//       rules: [
//         {
//           oneOf: [
//             {
//               test: /\.((j|t)s(x?))$/,
//               exclude: /(node_modules|bower_components)/,
//               use: [
//                 {
//                   loader: "swc-loader",
//                 },
//                 {
//                   loader: require.resolve("ts-loader"),
//                   options: getTSLoaderOptions(),
//                 },
//               ],
//             },
//             {
//               test: /\.svg$/,
//               use: [
//                 {
//                   loader: require.resolve("@svgr/webpack"),
//                   options: {
//                     prettier: false,
//                     svgo: false,
//                     svgoConfig: {
//                       plugins: [{ removeViewBox: false }],
//                     },
//                     titleProp: true,
//                     ref: true,
//                   },
//                 },
//                 {
//                   loader: require.resolve("file-loader"),
//                   options: {
//                     name: "static/media/[name].[hash].[ext]",
//                   },
//                 },
//               ],
//               issuer: {
//                 and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
//               },
//             },
//             {
//               test: /\.(sa|sc|c)ss$/i,
//               exclude: /\.module\.(sa|sc|c)ss$/i,
//               use: [
//                 styleLoader,
//                 {
//                   loader: "css-loader",
//                   options: {
//                     importLoaders: 1,
//                     modules: {
//                       mode: "icss",
//                     },
//                   },
//                 },
//                 postCssLoader,
//                 sassLoader,
//               ],
//               sideEffects: true,
//             },
//             // SCSS MODULES
//             {
//               test: /\.module\.(sa|sc|c)ss$/i,
//               use: [
//                 styleLoader,
//                 {
//                   loader: "css-loader",
//                   options: {
//                     importLoaders: 1,
//                     modules: {
//                       mode: "local",
//                       getLocalIdent: getCSSModuleLocalIdent,
//                     },
//                   },
//                 },
//                 postCssLoader,
//                 sassLoader,
//               ],
//             },
//             {
//               test: /\.(png|jpe?g|gif|svg)$/,
//               type: "asset",
//               parser: {
//                 dataUrlCondition: {
//                   maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
//                 },
//               },
//             },
//             {
//               test: /\.(ttf|woff2?)$/,
//               type: "asset/resource",
//             },
//             {
//               // Exclude `js` files to keep "css" loader working as it injects
//               // by webpacks internal loaders.
//               exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
//               type: "asset/resource",
//             },
//           ],
//         },
//       ],
//     },
//     externals: [
//       {
//         react: {
//           root: "React",
//           commonjs2: "react",
//           commonjs: "react",
//           amd: "react",
//         },
//         "react-dom": {
//           root: "ReactDOM",
//           commonjs2: "react-dom",
//           commonjs: "react-dom",
//           amd: "react-dom",
//         },
//       },
//     ],
//     optimization: {
//       minimize: isEnvProduction,
//       minimizer: [],
//       usedExports: true,
//       sideEffects: true,
//     },
//     plugins: [
//       isEnvDevelopment && new ReactRefreshWebpackPlugin(),
//       isEnvDevelopment &&
//         new HtmlWebpackPlugin({
//           template: appHtml,
//         }),
//     ].filter(Boolean),
//   };
// };
