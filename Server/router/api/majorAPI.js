const express = require('express');
const router = express.Router();
const majorController = require('../../controller/MajorController');

router.post('/add', majorController.addMajor);
router.get('/list', majorController.getAllMajor);
router.get('/:majorId', majorController.getMajorByMajorId);
module.exports = router;