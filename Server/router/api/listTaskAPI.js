const express = require('express');
const ListTaskController = require('../../controller/ListTaskController');
const router = express.Router();

router.post('/add/:stageId', ListTaskController.addListTask);
router.post("/update/:stageId/:listTaskId", ListTaskController.updateListTask);
router.post("/delete/:stageId/:listTaskId", ListTaskController.deleteTaskList);
router.get("/list/:stageId", ListTaskController.getAllTaskListOfStage);
module.exports = router;