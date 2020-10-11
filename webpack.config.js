const path = require('path');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  ];

  return loaders;
};

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        reloadAll: true,
      },
    },
    'css-loader',
    'postcss-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const filename = (ext) =>
  isProd ? `[name].[chunkhash].${ext}` : `[name].${ext}`;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsPlugin(),
    ];
  }

  return config;
};

const plugins = () => {
  const base = [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new WebpackMd5Hash(),
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HtmlWebpackPlugin({
      template: './pages/cart.html',
      filename: 'cart.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HtmlWebpackPlugin({
      template: './pages/checkout.html',
      filename: 'checkout.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HtmlWebpackPlugin({
      template: './pages/product.html',
      filename: 'product.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HtmlWebpackPlugin({
      template: './pages/single.html',
      filename: 'single.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ];

  return base;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),

  entry: {
    index: ['@babel/polyfill', './index.js'],
    cart: './pages/cart.js',
    checkout: './pages/checkout.js',
    product: './pages/product.js',
    single: './pages/single.js',
  },

  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },

  optimization: optimization(),

  devServer: {
    hot: isDev,
  },

  devtool: isDev ? 'source-map' : '',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: jsLoaders(),
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
          'file-loader?name=./assets/images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./assets/fonts/[name].[ext]',
      },
    ],
  },

  plugins: plugins(),
};
