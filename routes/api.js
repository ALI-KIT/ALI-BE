var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController')
var localController = require('../controllers/localController');

/* GET home page. */
// router.use(TokenCheckMiddleware)
router.get('/category', function(req, res, next) {
    const data = categoryController.get
    res.send(data)
});

router.use('/news', require('../controllers/newsController'))

router.get('/local', localController.home)

module.exports = router;