//All of this is boiler plate. If you go on the mongoose docs
//and go under models and then schema, you will see this.

//With schema we are making an object library

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Setting up a blueprint for each accessory
const courseSchema = new Schema({
    title: String,
    description: String,
    imageUrl : String,
    checkbox : String,
    timeCreated : String,
    usersEnrolled : String
});

const Course = mongoose.model("Course", courseSchema); //model gives us functions that lets 
//talk to the database

module.exports = Course;
