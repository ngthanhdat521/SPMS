const express = require('express');
const router = express.Router();
const stageController = require('../../controller/StageController');

router.post('/add/:projectId', stageController.addStage);
router.post("/update/:projectId/:stageId", stageController.updateStage);
router.post("/delete/:projectId/:stageId", stageController.deleteStage);
router.get("/list/:projectId", stageController.getAllStageOfProject)
module.exports = router;