// @ts-nocheck
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

let cleanOptions = {
  verbose: true,
}

module.exports = () => ({
  plugins: [
    new CleanWebpackPlugin(cleanOptions),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      BASE_API: JSON.stringify('http://www.google.com'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
})
