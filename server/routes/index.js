var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    author: 'zalva',
    appName: 'fishproject',
    company: 'maritima',
  });
});

module.exports = router;
