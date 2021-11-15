"use strict";

var express = require('express');

var router = express.Router();
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    author: 'zalva',
    appName: 'fishproject',
    company: 'maritima'
  });
}); //agregando nueva ruta

router.get('/greeting', function (req, res, next) {
  res.status(200).json({
    message: 'hola campeon'
  });
});
module.exports = router;