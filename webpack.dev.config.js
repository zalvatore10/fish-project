const path= require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//importando el eslint
const EsLintWebpackPlugin = require('eslint-webpack-plugin');
module.exports = {
    //establecer el modo de este archivo 
    mode:'development', 
    //1.- espesificar el archivo de entrada
    entry:'./client/index.js',
    //2.- espesificando la salida 
    output:{
        //3.- ruta absoluta
        path: path.join(__dirname,'public'),
        //4.- nombre del archivo de salida
        filename:'js/bundle.js',
        //5.- ruta del path publico
        publicPath:'/'
    },
    devServer:{
        static: path.join(__dirname,'public'),
        port:process.env.PORT || '3000',
        host:'localhost'
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /(node_modules|bower_components)/,
                use:{
                    loader:'babel-loader',
                    options: {
                        presets:[
                            [
                                '@babel/preset-env',
                                {
                                    'modules':false,
                                    'useBuiltIns':'usage',
                                    'targets':{"chrome":"80"},
                                    'corejs': 3
                                }
                            ]
                        ],
                           "plugins":[
                               [ 
                                   "module-resolver",
                                   {
                                       "root":["./"],
                                       "alias":{
                                           "@client":"./client",
                                       }
                                   }
                               ]
                           ]
                    }
                }
            },
            {
                test: /\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/app.css',
        })
       // new EsLintWebpackPlugin()
    ]
}