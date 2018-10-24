const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    'bundle': './src/javascripts/app.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: 'dist',
    port: 4000,
    historyApiFallback: true,
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
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: 'css-loader!sass-loader'
        }),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ filename: '[name].css',  allChunks: true }),
  ]
}
