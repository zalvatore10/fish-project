"use strict";

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("@babel/index"));

var _user = _interopRequireDefault(require("./soutes/user"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));

var _webpackHotMiddleware = _interopRequireDefault(require("webpack-hot-middleware"));

var _webpackDev = _interopRequireDefault(require("../webpack.dev.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
// webpack modules
// consultar el modo en que se ejecuta la aplicacion
const env = process.env.NODE_ENV || 'developement'; // se crea la aplicacion express

const app = (0, _express.default)(); // verificando el modo de ejcecucion de la aplicacion

if (env === 'development') {
  console.log('> Excecuting in Development Mode: Webpack Hot Reloading'); // paso 1.- agregando la ruta del HMR
  // reload=true: habilita la recarga del frontend cuando hay cambios en el codigo fuente del forntend
  // timeout=1000: teimpo de espera entre recarga y carga

  _webpackDev.default.entry = ['webpack-hot-middleware/client?reload=true&timeout=1000', _webpackDev.default.entry]; // paso 2.- agregamos los plugins

  _webpackDev.default.plugins.push(new _webpack.default.HotModuleReplacementPlugin()); // paso 3.- crear el compilador de webpack


  const compiler = (0, _webpack.default)(_webpackDev.default); // paso 4.- agregando el middleware a la cadena de middleware de la aplciacion

  app.use((0, _webpackDevMiddleware.default)(compiler, {
    publicPath: _webpackDev.default.output.publicPath
  })); // paso 5.- agregando el WHM

  app.use((0, _webpackHotMiddleware.default)(compiler));
} else {
  console.log('> Excecuting in Production Mode...');
} // view engine setup


app.set('views', _path.default.join(__dirname, 'views'));
app.set('views engine', 'hbs');
app.use((0, _morgan.default)('dev')); // req=>[middelware 01] => [middelware 02]

app.use(_express.default.json()); // transformador a json

app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)()); // manejo e cookies

app.use(_express.default.static(_path.default.join(__dirname, '..', 'public'))); // refrerencia a la parte estatica

app.use('/', _index.default);
app.use('/users', _user.default); // catch 404 and forward to error handler

app.use((req, res, next) => {
  next((0, _httpErrors.default)(404));
}); // error handler

app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;