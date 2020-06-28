const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const PKG = require('./package.json')

const IS_DEV = process.env.NODE_ENV !== 'production'

function DummyPlugin() {}
DummyPlugin.prototype.apply = function noop(/* compiler */) {}

module.exports = {
  stats: IS_DEV ? 'minimal' : 'normal',
  mode: IS_DEV ? 'development' : 'production',
  devtool: IS_DEV ? 'inline-source-map' : 'source-map',
  devServer: {
    host: 'localhost',
    port: 5000,
    overlay: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    publicPath: '/',
  },
  entry: {
    bundle: './src/main.ts',
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: IS_DEV ? '[name].js' : '[name].[hash:8].js',
    publicPath: './',
  },
  resolve: {
    alias: { '/src': path.resolve(__dirname, 'src/') },
    extensions: ['.wasm', '.mjs', '.js', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: 'images',
              publicPath: './images',
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: IS_DEV,
              reloadAll: true,
              publicPath: './',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: {
                auto: true,
                exportGlobals: true,
                localIdentName: IS_DEV
                  ? '[path][name]__[local]'
                  : '[hash:base64]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    IS_DEV ? new webpack.HotModuleReplacementPlugin() : new DummyPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: PKG.description,
    }),
    new MiniCssExtractPlugin({
      filename: IS_DEV ? '[name].css' : '[name].[hash:8].css',
      chunkFilename: IS_DEV ? '[id].css' : '[id].[hash:8].css',
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),
    ],
  },
}
