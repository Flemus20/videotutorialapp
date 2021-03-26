//When button is clicked :
//Grab user _id (by token), and push it onto the "enrolledusers" Course key
//Grab courser _id and push it onto the "enrolledcourses" User key

//If statement
//If user _id is in the "enrolledusers" course key, display "already enrolled" -
//and do not display button 
//perhaps put an {{if }} in details page for this

var express = require('express');
var router = express.Router();
const Video = require('../models/video');
const User = require('../models/user');
//THIS IS FOR ADDING A VIDEO TO A SPECIFIC USER (WHEN THEY CLICK ENROLL BUTTON ON VIDEO DETAILS PAGE)
let videoID;
let videoTitle;
//runs the enroll get request to display the video to be enrolled in...
router.get('/:id', function(req, res, next) {
  videoID = req.params.id;
  Video.findOne({_id: videoID})
    .then((results) => { 
      videoTitle = results.title;
      res.render('enroll', {video: results, user: req.user});
    });
});


router.post('/:id', function(req, res, next) {
  let videoID = req.params.id;
  console.log('The enroll POST request fired', videoID);
  let person = req.user.username;
  let personID = req.user._id;
  
  // update the VIDEO to associate the user
  Video.findOneAndUpdate(
    {_id: videoID},
    //this pushes the username into the array held in the VIDEO model
    { $push: {"users": personID}},
    //upsert true means if it doesn't exist create it (false is the default value)
    { upsert: true }, 
    function(err) {if (err) console.log(err);}
);
  //update the USER to add the enrolled video "course"
  User.findOneAndUpdate(
      {_id: personID}, 
      { $push: {"courses": videoID}},
      { upsert: true }, 
      function(err) {if (err) console.log(err);
  });
res.redirect("/home");
});

module.exports = router;