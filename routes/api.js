var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController')

/* GET home page. */
router.get('/category', function(req, res, next) {
    const data = categoryController.get
    res.send(data)
});

router.use('/post', require('../controllers/postController'))

module.exports = router;