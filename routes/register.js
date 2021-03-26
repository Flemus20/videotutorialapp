var express = require('express');
var router = express.Router();
const { body, validationResult} = require('express-validator');
const User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/', 

// username must be 5 characters long
body('username').isLength( { min: 5 }),
// password must be at least 5 chars long
body('password').isLength({ min: 8 }),


async function (req, res, next) {
 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const alert = errors.array()
    res.render('register', {
      alert
    })
  }

  else{
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.redirect('/');
  }catch (error) {
  console.log('le error' ,errors.array())
    res.render('register', 
    { errors: errors.array()
    })
  }
  }

});

module.exports = router;
