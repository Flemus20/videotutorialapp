var express = require('express');
var router = express.Router();
const Course = require('../models/course');
//const auth = require('../controllers/auth');

/* GET Edit page. */
router.get('/:id/', (req, res, next) => {
  let id = req.params.id;

  Course.findOne({_id: id})
      .then((results) => {
           res.render('editcourse', {course: results});
  });    
});

router.post('/:id', async (req, res) => {    
  let course;
   try {
      course = await Course.findById(req.params.id);
      course.title = req.body.title, 
      course.description = req.body.description, 
      course.imageUrl = req.body.imageUrl, 
      await course.save();
      res.redirect(`/`);
  }catch(err) {
      if(err) throw err;
          if (course == null) {
              res.redirect('/');
          }else {
              res.render('details', { course: course, errorMessage: 'Error Editing Course'});
          }       
  }     
});



module.exports = router;




