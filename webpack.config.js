const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const outputPath = path.resolve(__dirname, './dist')

module.exports = {
  mode: 'development',
  entry: './client/index.tsx',
  output: {
    path: outputPath,
    filename: 'index.js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html"
    })
  ],

  devServer:{
    static: {
      directory: outputPath
    }
  }
}
