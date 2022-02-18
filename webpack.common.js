const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FontPreloadPlugin = require("webpack-font-preload-plugin");

module.exports = {
  entry: './src/app/App.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  plugins: [
    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: 'assets',
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),

    new HtmlWebpackPlugin({
      title: 'flyRegistry',
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
      meta: {}
    }),

    new FontPreloadPlugin({
      loadType: "preload",
      insertBefore: "head > title",
      extensions: ["woff2", "woff"],
    }),

    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],

  module: {
    rules: [

      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },

      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        }
      },

      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        }
      },

      {
        test: /\.svg$/,
        use:[
          '@svgr/webpack',
        ]
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

};
