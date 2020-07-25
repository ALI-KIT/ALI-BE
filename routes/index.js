var express = require('express');
const { loginRequired } = require('../middlewares/Required');
var router = express.Router();

/* GET home page. */
// router.use(loginRequired)
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
