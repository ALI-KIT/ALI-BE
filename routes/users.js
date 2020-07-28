var express = require('express');
var router = express.Router();

/* GET users listing. */

router.use('/',require('../controllers/userController'));

module.exports = router;
