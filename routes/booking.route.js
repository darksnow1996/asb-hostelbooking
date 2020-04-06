var express = require('express');
var router = express.Router();
const bookingController = require('../controllers/booking');
const {bookingMiddleware} = require('../middleware');

router.post('/addbooking',bookingMiddleware.addBooking, bookingController.book);
router.get('/getbookings',bookingController.getBookings);
//router.get('/checkrooms',bookingController.checkavailablerooms);
// router.post('/test',bookingController.testavailble);




module.exports = router;
