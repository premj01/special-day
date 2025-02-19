var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var app = express();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var session = require('express-session')
var cors = require('cors')
let ejs = require('ejs');
const keepAlive = require('./keep-alive');

app.use(session({
  resave:false,
  saveUninitialized:false,
  secret:"hey buddy how are you"
}))
keepAlive();
app.use('/public' ,express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json())
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });


// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// for universal paths
app.use(function(req, res, next) {
  res.status(404).send('<h1>404<br>Sorry, we cannot find that!<h1>');
});


module.exports = app;


