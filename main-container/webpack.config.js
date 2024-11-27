const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    publicPath: 'auto',
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        forms: 'forms@http://localhost:8081/remoteEntry.js',
        tables: 'tables@http://localhost:8082/remoteEntry.js',
        tables1: 'tables1@http://localhost:8083/remoteEntry.js',
      },
      shared: {
        react: { 
          singleton: true,
          eager: true
        },
        'react-dom': { 
          singleton: true,
          eager: true
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
