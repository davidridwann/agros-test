var express = require('express');
var router = express.Router();
var driverController = require('../controllers/driverController');

router.get('/', driverController.index);
router.post('/store', driverController.store);
router.put('/update', driverController.update);
router.delete('/delete/:id', driverController.destroy);

module.exports = router;
