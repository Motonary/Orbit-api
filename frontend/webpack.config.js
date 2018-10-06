const path = require('path')

module.exports = {
  entry: {
    'bundle': './src/javascripts/app.js'
  },
  // [name]にはentryポイントのkeyが挿入される
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: 'dist',
    port: 4000,
    inline: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ]
  }
}
