var express = require('express');
var router = express.Router();
const roomConfigurationController = require('../controllers/roomConfiguration');

router.post('/create',roomConfigurationController.create);

module.exports = router;
