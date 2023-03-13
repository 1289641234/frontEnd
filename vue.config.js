// const { defineConfig } = require('@vue/cli-service')
const CopyWebpackPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const ElementPlus = require("unplugin-element-plus/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

const webpack = require("webpack");
const path = require("path");

const cesiumSource = "./node_modules/cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";

module.exports = {
  publicPath: process.env.NODE_ENV == "development" ? "./" : "/test/",
  productionSourceMap: false,
  transpileDependencies: true,
  devServer: {
    host: "127.0.0.1",
    port: 8001,
    open: true,
  },
  configureWebpack: {
    resolve: {
      // 设置别名
      alias: {
        "@": path.resolve(__dirname, "src"),
        cesium: path.resolve(__dirname, cesiumSource),
      },
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.join(cesiumSource, cesiumWorkers),
          to: "Workers",
        },
      ]),
      new CopyWebpackPlugin([
        {
          from: path.join(cesiumSource, "Assets"),
          to: "Assets",
        },
      ]),
      new CopyWebpackPlugin([
        {
          from: path.join(cesiumSource, "Widgets"),
          to: "Widgets",
        },
      ]),
      new CopyWebpackPlugin([
        {
          from: path.join(cesiumSource, "ThirdParty"),
          to: "ThirdParty",
        },
      ]),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify("./"),
      }),
      new NodePolyfillPlugin(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      ElementPlus(),
    ],
  },
};
