// import * as path from "path";
var path = require("path");
var nodeExternals = require("webpack-node-externals");

console.log("webpack config called .");
module.exports = {
  target: "node",
  entry: "./src/server.ts",
  devtool: "inline-source-map",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        // exclude: /node_modules\/(?!(ts-loader\/node_modules\/micromatch\/index.js))/,
        use: ["babel-loader", "ts-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  }
};
