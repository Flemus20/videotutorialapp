var express = require('express');
var router = express.Router();
const Course = require('../models/course');
//const auth = require('../controllers/auth');



router.get('/', function(req, res, next) {
  let id = req.params.id;
  Course.deleteOne(id)
    .then((results) => {
      res.redirect('/')
    });
});

module.exports = router;