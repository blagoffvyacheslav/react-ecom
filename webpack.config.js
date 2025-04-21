const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsCheckPlugin = require('fork-ts-checker-webpack-plugin');

const rootPath = path.resolve(__dirname);
const srcPath = path.resolve(__dirname, 'src');

const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => [
  isProd ? MiniCssExtractPlugin.loader : 'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: withModules
        ? {
            namedExport: false,
            localIdentName: isProd ? '[hash:base64]' : '[path][name]__[local]',
            exportLocalsConvention: 'asIs',
          }
        : false,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: ['autoprefixer'],
      },
    },
  },
  {
    loader: 'sass-loader',
    options: {},
  },
];

module.exports = () => ({
  target: isProd ? 'browserslist' : 'web',
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  mode: isProd ? 'production' : 'development',
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/react-ecom/',
    filename: 'bundle.[contenthash].js',
    clean: true, // Очищает папку dist перед новой сборкой
    publicPath: '/',
    assetModuleFilename: 'assets/[name].[contenthash][ext]',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@components': path.join(srcPath, 'components'),
      '@mappers': path.join(srcPath, 'mappers'),
      '@config': path.join(srcPath, 'config'),
      '@styles': path.join(srcPath, 'styles'),
      '@mixins': path.join(srcPath, 'mixins'),
      '@colors': path.join(srcPath, 'colors'),
      '@spacing': path.join(srcPath, 'spacing'),
      '@utils': path.join(srcPath, 'utils'),
      '@types': path.join(srcPath, 'types'),
      '@pages': path.join(srcPath, 'pages'),
      '@store': path.join(srcPath, 'store'),
      '@App': path.join(srcPath, 'App'),
    },
  },
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(false),
      },
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
            plugins: [!isProd && 'react-refresh/babel'].filter(Boolean),
          },
        },
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    hot: true,
    port: 3000,
    client: {
      overlay: {
        errors: true,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(rootPath, 'index.html'),
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    isProd &&
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
    new TsCheckPlugin(),
  ].filter(Boolean),
});
