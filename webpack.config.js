const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

const { NODE_ENV = 'development' } = process.env

module.exports = {
  entry: ['./src/index.ts'],
  mode: NODE_ENV,
  target: 'node',
  watch: NODE_ENV === 'development',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin({
      format:
        chalk.hex('#6c5ce7')('build ') +
        chalk.hex('#0984e3')('▯:bar▯ ') +
        // chalk.red('▯ :bar ▯ ') +
        chalk.hex('#00b894')('(:percent) ') +
        // chalk.green(':percent ') +
        chalk.hex('#ffeaa7')(':msg'),
      // chalk.blue('( :elapsed s )')
      complete: '▰',
      incomplete: '▱',
      clear: false,
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },
}
