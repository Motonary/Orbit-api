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
  resolve: {
    extensions:['.ts','.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: 'css-loader!sass-loader'
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ filename: '[name].css',  allChunks: true }),
  ]
}
