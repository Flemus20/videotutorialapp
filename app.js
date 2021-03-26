var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const auth = require('./controllers/auth');

require('dotenv').config()
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coursedetailsRouter = require('./routes/coursedetails');
var createcourseRouter = require('./routes/createcourse');
var editcourseRouter = require('./routes/editcourse');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var deletecourseRouter = require('./routes/deletecourse');
var logoutRouter = require('./routes/logout')


var app = express();


//To hide Mongo connection variables
require('dotenv').config()



mongoose.connect(process.env.DB_URI,  {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then((res) => console.log('db connected'))
.catch((err) => console.log(err));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Unprotected Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/editcourse', editcourseRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/deletecourse', deletecourseRouter);

//Protected Routes
//app.use(auth)
app.use('/coursedetails', coursedetailsRouter);
app.use('/createcourse', createcourseRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
