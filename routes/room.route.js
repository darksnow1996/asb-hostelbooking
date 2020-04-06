var express = require('express');
var router = express.Router();
const roomController = require('../controllers/room');

router.post('/create', roomController.addRoom);
router.put('/:id/edit',roomController.editRoom);
router.get('/:roomNo/',roomController.getRoom);

module.exports = router;
