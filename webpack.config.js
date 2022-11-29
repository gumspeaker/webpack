const path = require("path");
// const Config = require("webpack-chain");
// const config = new Config();
// const {} = require("webpack");
// import path from "path";
// import {} from "webpack";
// config.entry("./src/index.js");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  optimization: {
    usedExports: true,
  },
  // chainWebpack: (webpackConfig) => {
  //   webpackConfig.module =
  // },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //   type: "asset/resource",
      // },
    ],
  },
};
