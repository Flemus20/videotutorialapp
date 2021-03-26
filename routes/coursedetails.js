var express = require('express');
var router = express.Router();
const Course = require('../models/course');
//const auth = require('../controllers/auth');




/* GET details by ID listing. */
router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  Course.findOne({_id: id})
    .then((results) => {
      res.render('coursedetails', {course: results})
    });
});

module.exports = router;