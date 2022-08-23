const express = require('express');
const router = express.Router();
const taskAssignmentController = require('../../controller/TaskAssginmentController');

router.post('/assign/:listTaskId/:taskId', taskAssignmentController.assignMembers);//TEST
// router.post("/update/:projectId/:stageId", stageController.updateStage)
module.exports = router;