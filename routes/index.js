var express = require('express');
const {handlebars} = require('hbs');
var router = express.Router();
const Course = require('../models/course');



/* GET home page */
router.get('/', function(req, res, next) {
  Course.find().then((course) => {
    res.render('index', {title:"Course", course: course})
  })
});

module.exports = router;
