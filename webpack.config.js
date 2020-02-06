const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    'live-validator': './src/index.js',
    'live-validator.min': './src/index.js'
  },
  output: {
    filename: "[name].js",
    libraryExport: "default",
    library: "LiveValidator",
    libraryTarget: "umd",
    path: path.resolve(__dirname, 'dist')
  },
  mode: "none",
  optimization: {
    minimize: true,
    minimizer: [
        new UglifyJsPlugin({
          include: /\.min\.js$/,
        }),
      ],
  },
  devServer: {
    port: 7000,
    inline:true,
    contentBase: path.join(__dirname, "dist")
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  module:{
		rules:[
			{
				test: /\.js$/,
				 exclude: /node_modules/, 
				 loader: "babel-loader"
			}
		]
	},
  plugins: [

  ]
};