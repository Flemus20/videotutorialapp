var express = require('express');
var router = express.Router();
const fs = require('fs');
const Course = require('../models/course');
const {handlebars} = require('hbs');
const auth = require('../controllers/auth');
const { body, validationResults } = require('express-validator');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('createcourse', { title: 'Create Course', loggedIn: req.cookies.loggedIn});
});


router.post('/', 

// username must be 5 characters long
body('title').isLength( { min: 4 }),
// password must be at least 5 chars long
body('description').isLength({ min: 20 })

,async function(req, res, next) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const alert = errors.array()
    res.render('create', {
      alert
    })
  }

  //this must be the same as course.js
  else {
      const newCourse = new Course({   
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      checkbox: undefined ? false : true,
      timeCreated : new Date(),
      usersEnrolled : String

      });

    

      
      newCourse.save()
      .then((result) => {
        res.redirect('/')
        })
        .catch((err) => {
          res.send(err)
        })
      }    
  });


module.exports = router;

