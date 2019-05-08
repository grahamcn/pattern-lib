const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require("webpack")
const webpackMerge = require('webpack-merge')
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env)
const applyPresets = require('./build-utils/applyPresets')
const BuildMenuPlugin = require('./build-utils/plugins/BuildMenu')

const paths = {
  DIST: path.resolve(__dirname, '.dist'),
  SRC: path.resolve(__dirname, 'src'),
	FONTS: path.resolve(__dirname, 'src/scss/fonts'),
}


// return a function with default values that returns a webpack config object
module.exports = ({mode = "production", presets = []}) => {
  return webpackMerge(
    {
      mode,
      entry: {
        filename: './src/main.ts'
      },
      output: {
				path: paths.DIST,
				filename: 'bundle.[hash].js',
				publicPath: '/',
      },
      plugins: [
        new BuildMenuPlugin(),
        new HtmlWebpackPlugin({
					template: path.join(paths.SRC, 'index.html'),
				}),
        new webpack.ProgressPlugin(),
      ],
      module: {
        rules: [{
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            'ts-loader',
          ],
        }, {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[hash].[ext]",
              },
            },
          ]
        }, {
          test: /\.(png|jpg|gif|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 8500,
            },
          }]
        }]
			},
      resolve: {
        extensions: ['.js', '.ts'],
      },
    },
    modeConfig(mode),
    applyPresets({mode, presets}),
  )
}
