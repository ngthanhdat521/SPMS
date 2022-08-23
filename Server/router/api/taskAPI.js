const express = require('express');
const router = express.Router();
const taskController = require('../../controller/TaskController');

router.post('/add/:stageId/:listTaskId', taskController.addTask);
router.post("/update/:stageId/:listTaskId/:taskId", taskController.updateTask);
router.post("/move/:stageId/:listTaskId/:taskId", taskController.moveTaskToListTaskOther);
router.post("/delete/:stageId/:listTaskId/:taskId", taskController.deleteTask);
router.get("/list/:stageId/:listTaskId", taskController.getAllTaskOfTaskList);
router.get("/get/:stageId/:listTaskId/:taskId", taskController.getTaskDetailOfTaskList);

module.exports = router;