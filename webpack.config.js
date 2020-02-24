const path = require('path')

module.exports = {
  context: __dirname,
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.']
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  }
}
