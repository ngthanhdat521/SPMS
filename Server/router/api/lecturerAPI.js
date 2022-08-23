const express = require('express');
const router = express.Router();
const lecturerController = require('../../controller/LecturerController');
const {uploadFile} = require('../../helper/upload');

router.post('/add', lecturerController.addLecturer);
router.post('/update/:userId', lecturerController.updateLecturerAndUser);
router.get('/list', lecturerController.getAllLecturer);
router.get('/get/:userId', lecturerController.getLecturerByUserId);
router.get("/exportFile", lecturerController.exportFile);
router.post("/add/topicTemplate", uploadFile("upload/templateTopic").array("document"),lecturerController.addTopicTemplate);
router.post("/update/topicTemplate/:lecturerId/:projectId",uploadFile("upload/templateTopic").array("document"),lecturerController.updateTopicTemplate);
module.exports = router;