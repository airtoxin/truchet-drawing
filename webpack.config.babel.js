import path from 'path';
import webpack from 'webpack';
import InlineEnviromentVariablesPlugin from 'inline-environment-variables-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';

const isProd = process.env.NODE_ENV === 'production';

const conf = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'target'),
    publicPath: '/',
    filename: '[name].js',
  },
  target: 'web',
  module: {
    rules: [
      { test: /\.js$/, include: [path.resolve(__dirname, 'src')], loader: 'babel-loader' },
      { test: /\.png$/, include: [path.resolve(__dirname, 'src')], loader: 'file-loader' },
    ],
  },
  plugins: [
    new InlineEnviromentVariablesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlPlugin({
      template: 'src/template.html',
    }),
  ],
  devtool: isProd ? false : 'cheap-module-source-map',
  devServer: {
    port: 8080,
    historyApiFallback: true,
    stats: 'errors-only',
  },
  stats: 'errors-only',
};

const envPlugins = isProd ? [
  new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }),
] : [
  new webpack.HotModuleReplacementPlugin(),
];

conf.plugins = conf.plugins.concat(envPlugins);

export default conf;
