const express = require('express');
const router = express.Router();
const DefenseController = require('../../controller/DefenseController');

router.post('/createDefense', DefenseController.createDefense);
router.post('/assignGroup', DefenseController.assignGroupDefense);
router.get('/getAllDefense', DefenseController.getAllDefense);
router.get('/getAllDefenseCap/:typeOfCap', DefenseController.getAllDefenseOfCap);
router.get('/getAllDefenseToAssign', DefenseController.getAllDefenseToAssign);
router.get('/getAllDefense/:lecturerId', DefenseController.getAllDefenseByLecturerId);
router.get('/getAllDefense/:lecturerId', DefenseController.getAllDefenseByLecturerId);
router.delete('/deleteDefense/:councilId', DefenseController.deleteDefense);
router.put('/updateDefense/:councilId', DefenseController.updateDefense);

module.exports = router;