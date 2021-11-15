const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
module.exports = {
  // 1. Se estrablece modo desarrollo
  mode: 'development',
  // 2. Especificar archivo entrada
  entry: './client/index.js',
  // 3. Salida de empaquetado
  output: {
    // 4. Ruta absoluta salida
    path: path.join(__dirname, 'public'),
    // 5. Nombre archivo salida
    filename: 'js/bundle.js',
    // 6. Servidor desarrollo, ruta path publico
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.js$ /,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    useBuiltIns: 'usage',
                    targets: { chrome: '80' },
                    corejs: 3,
                  },
                ],
              ],
              plugins: [
                [
                  'module-resolver',
                  {
                    root: ['./'],
                    alias: {
                      '@client': './client',
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/app.css',
    }),
    new EslintWebpackPlugin(),
  ],
};
