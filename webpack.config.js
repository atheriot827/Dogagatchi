const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const path = require('path');
<<<<<<< HEAD
const Dotenv = require('dotenv-webpack');

=======
const Dotenv = require('dotenv-webpack')
const CopyPlugin = require("copy-webpack-plugin")
>>>>>>> upstream/main
const SRC_DIR = path.resolve(__dirname, 'client');
const DIST_DIR = path.resolve(__dirname, 'dist');

module.exports = {

  resolve: {
    fallback: {
      fs: false,
      os: false,
      path: false,
      crypto: false,
    },
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  entry: {
    app: path.resolve(SRC_DIR, 'index.jsx'),
  },

  output: {
    path: DIST_DIR,
    filename: '[name].bundle.js',
  },

  plugins: [
    // Creates a loading bar
    new WebpackBar(),
    // Clears files in ./dist
    // new CleanWebpackPlugin(),
    // generates an html file from template
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_DIR, 'index.html'),
    }),

<<<<<<< HEAD
    new Dotenv(),
=======
    new CopyPlugin({
      patterns: [
        {from: "client/components/assets", to: "assets"},
      ],
    }),

    new Dotenv()
>>>>>>> upstream/main
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|jpg|png|mp3|aac|ogg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
    ],
  },

};
