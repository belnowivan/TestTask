const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const local_proxy = require('./webpack.dev.local.proxy.js');

const proxy = local_proxy;

module.exports = merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                auto: (resourcePath) => resourcePath.endsWith(".module.scss"),
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ]
  },

  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8089,
    ...proxy.devServer,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],
});
