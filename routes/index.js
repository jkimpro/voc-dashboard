var express = require('express');
var router = express.Router();
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'voc dashboard' });
});

router.get('/report', function(req, res, next) {
  res.render('report', { title: 'voc dashboard' });
});

module.exports = router;
