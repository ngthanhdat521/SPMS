const express = require('express');
const router = express.Router();
const evaluateStageController = require('../../controller/EvaluateStageController');

router.post('/add', evaluateStageController.addEvaluates);
router.get('/get/:stageId', evaluateStageController.getEvaluateOfStageDetail);
router.post('/update', evaluateStageController.updateEvaluates);
router.post('/delete/all/:stageId', evaluateStageController.deleteAllEvaluatesOfStage);

module.exports = router;
