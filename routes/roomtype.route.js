var express = require('express');
var router = express.Router();
const roomTypeController = require('../controllers/roomtype');

router.post('/create',roomTypeController.create);

module.exports = router;
