var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const{Room,roomType,Booking,roomConfiguration} = require('./models');

const roomRouter = require('./routes/room.route');
const roomTypeRouter = require('./routes/roomtype.route');
const bookingRouter = require('./routes/booking.route');
const roomConfigurationRouter = require('./routes/roomconfiguration.route');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

app.use('/roomtype', roomTypeRouter);
app.use('/booking', bookingRouter);
app.use('/room',roomRouter);
app.use('/configuration',roomConfigurationRouter);

roomConfiguration.hasMany(Room);
Room.belongsTo(roomConfiguration);
Room.hasMany(Booking);
Booking.belongsTo(Room);
roomType.hasMany(roomConfiguration);
roomConfiguration.belongsTo(roomType);


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
  console.log(err);
  return res.status(500).json({error: err.message});
});

module.exports = app;
