"use strict";

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _routes = _interopRequireDefault(require("./routes"));

var _users = _interopRequireDefault(require("./routes/users"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));

var _webpackHotMiddleware = _interopRequireDefault(require("webpack-hot-middleware"));

var _webpackDev = _interopRequireDefault(require("../webpack.dev.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
// importar modulos de webpack
// consultar modo en que se ejecuta la aplicacion
const env = process.env.NODE_ENV || 'developement'; // creacion aplicacion express

const app = (0, _express.default)(); // verficiar modo ejecucion de la aplicacion

if (env === 'development') {
  console.log('> Excecuting in Development Mode: Webpack hot Reloading'); // ruta del Hot module replasmen
  // reload=true: habilita recarga fronted al tener cambios en codigo fuente del fronted
  // timeout=1000: Tiempo espera recarga

  _webpackDev.default.entry = ['Webpack-hot-middleware/client?reload=true&timeout=1000', _webpackDev.default.entry]; // Agregar plugin

  _webpackDev.default.plugins.push(new _webpack.default.HotModuleReplacementPlugin()); // compilador


  const compiler = (0, _webpack.default)(_webpackDev.default); // Agregando middleware a cadena

  app.use((0, _webpackDevMiddleware.default)(compiler, {
    publicPath: _webpackDev.default.output.publicPath
  })); // webpack hot middleware

  app.use((0, _webpackHotMiddleware.default)(compiler));
} else {
  console.log('> Excecuting in Production Mode... ');
} // view engine setup


app.set('views', _path.default.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use(_express.default.static(_path.default.join(__dirname, '..', 'public')));
app.use('/', _routes.default);
app.use('/users', _users.default); // catch 404 and forward to error handler

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