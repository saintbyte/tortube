var express = require('express');
var router = express.Router();
const models  = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
    var ctx = {};
    ctx['title'] = 'Title';
     models.Video.findAll({limit: 10}).then((result) => {
         ctx['videos'] = result;
         res.render('index', ctx);
    });

});

module.exports = router;
